// netlify/functions/analyzeData.ts
import { Handler } from "@netlify/functions";
import Busboy from "busboy";
import { PassThrough } from "stream";
import csv from "csv-parser";
import { OpenAI } from "openai";

type ParsedFields = { [key: string]: string };
type ParsedFile = { filename: string; mimeType: string; buffer: Buffer };

function parseMultipartFromEvent(eventBody: string, headers: { [k: string]: string | undefined }) {
  return new Promise<{ fields: ParsedFields; file?: ParsedFile }>((resolve, reject) => {
    const contentType = headers["content-type"] || headers["Content-Type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return reject(new Error("Expected multipart/form-data"));
    }

    // Create busboy instance with boundary from content-type
    const bb = Busboy({ headers: { "content-type": contentType } });
    const fields: ParsedFields = {};
    let fileBuffer: Buffer | null = null;
    let filename = "";
    let mimeType = "";

    bb.on("field", (name, val) => {
      fields[name] = val;
    });

    bb.on("file", (_name, file, info) => {
      const chunks: Buffer[] = [];
      filename = info.filename;
      mimeType = info.mimeType;
      file.on("data", (data: Buffer) => chunks.push(data));
      file.on("end", () => {
        fileBuffer = Buffer.concat(chunks);
      });
    });

    bb.on("error", (err) => reject(err));
    bb.on("finish", () => {
      resolve({ fields, file: fileBuffer ? { filename, mimeType, buffer: fileBuffer } : undefined });
    });

    // pipe the base64-decoded body into busboy
    const bodyBuffer = Buffer.from(eventBody, "base64");
    const passthrough = new PassThrough();
    passthrough.end(bodyBuffer);
    passthrough.pipe(bb);
  });
}

function parseCSVBuffer(buffer: Buffer): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const rows: Record<string, any>[] = [];
    const stream = new PassThrough();
    stream.end(buffer);
    stream
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}

function summariseDataset(rows: Record<string, any>[]) {
  const recordCount = rows.length;
  const columns = recordCount > 0 ? Object.keys(rows[0]) : [];
  const sample = rows.slice(0, 5);
  // Basic numeric aggregates for columns that look numeric
  const numericAggs: Record<string, { count: number; sum: number; avg: number | null }> = {};
  for (const col of columns) {
    let count = 0;
    let sum = 0;
    for (const r of rows) {
      const v = r[col];
      const num = typeof v === "number" ? v : Number(String(v).replace(/,/g, ""));
      if (!Number.isNaN(num) && v !== null && v !== undefined && v !== "") {
        count++;
        sum += num;
      }
    }
    numericAggs[col] = { count, sum, avg: count > 0 ? sum / count : null };
  }

  return { recordCount, columns, sample, numericAggs };
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!event.body || !event.isBase64Encoded) {
      return { statusCode: 400, body: JSON.stringify({ error: "No file body found (Netlify functions require base64-encoded body for uploads)." }) };
    }

    // Parse multipart
    const { fields, file } = await parseMultipartFromEvent(event.body, event.headers as any);

    if (!file) {
      return { statusCode: 400, body: JSON.stringify({ error: "No file uploaded. Please upload a CSV file under 'dataset' form field." }) };
    }

    // Accept only CSV
    const filename = file.filename || "upload.csv";
    if (!filename.toLowerCase().endsWith(".csv")) {
      return { statusCode: 400, body: JSON.stringify({ error: "Only CSV files are supported. Rename your file to .csv and try again." }) };
    }

    // Parse CSV buffer
    const rows = await parseCSVBuffer(file.buffer);

    // Summarize dataset (keeps token usage small)
    const summary = summariseDataset(rows);

    // Build prompt for GPT-4
    const datasetName = fields.datasetName || filename;
    const datasetDescription = fields.datasetDescription || "";
    const question = fields.question || "";

    if (!question) {
      return { statusCode: 400, body: JSON.stringify({ error: "Please include a 'question' field describing what you want to analyze." }) };
    }

    const systemPrompt = `You are a business data analyst. The user uploaded a CSV dataset. Use the provided dataset summary and answer the user's question concisely, with clear actionable recommendations if applicable.`;

    const userPrompt = `
Dataset:
Name: ${datasetName}
Description: ${datasetDescription}
Total records: ${summary.recordCount}
Columns: ${summary.columns.join(", ")}

Sample rows: ${JSON.stringify(summary.sample, null, 2)}

Numeric column aggregates (count, sum, avg where applicable):
${JSON.stringify(summary.numericAggs, null, 2)}

User question: ${question}

Instructions:
1) Provide a short direct answer to the question.
2) Provide up to 5 key insights from the dataset that support the answer.
3) Provide 2-3 actionable business recommendations (if applicable).
4) If the answer cannot be determined from the provided data, clearly list what additional data or columns are needed.
Keep the response concise, structured and easy for a business owner to act on.
`;

    // Initialize OpenAI client
    if (!process.env.OPENAI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "OpenAI API key not configured on server." }) };
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Call OpenAI Chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.2
    });

    const aiText = completion.choices?.[0]?.message?.content || "";

    // Extract bullet-like insights from the response (simple heuristic)
    const insights: string[] = [];
    aiText.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (/^(\d+\.|[-*•])\s+/.test(trimmed)) {
        const cleaned = trimmed.replace(/^(\d+\.|[-*•])\s+/, "").trim();
        if (cleaned.length > 5) insights.push(cleaned);
      }
    });

    // If not found, pick sentences containing business keywords
    if (insights.length === 0) {
      const sentences = aiText.split(/[.?¡!]|[\r\n]+/).map(s => s.trim()).filter(Boolean);
      for (const s of sentences) {
        const low = s.toLowerCase();
        if (low.includes("increase") || low.includes("decrease") || low.includes("trend") || low.includes("recommend") || low.includes("suggest") || low.includes("growth") || low.includes("performance")) {
          insights.push(s);
          if (insights.length >= 5) break;
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: aiText,
        insights: insights.slice(0, 5),
        summary: summary
      })
    };

  } catch (err: any) {
    console.error("analyzeData error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message || "Unknown server error" })
    };
  }
};
