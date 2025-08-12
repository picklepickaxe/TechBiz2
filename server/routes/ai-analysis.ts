import { RequestHandler } from "express";
import OpenAI from "openai";
import multer from "multer";
import csv from "csv-parser";
import xlsx from "xlsx";
import { Readable } from "stream";

// Lazy-load OpenAI client to avoid errors during server startup
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export interface AIAnalysisRequest {
  question: string;
  datasetName: string;
  datasetDescription: string;
}

export interface AIAnalysisResponse {
  answer: string;
  insights?: string[];
  error?: string;
}

const parseFile = (file: Express.Multer.File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const readableStream = new Readable();
    readableStream._read = () => {}; // _read is required
    readableStream.push(file.buffer);
    readableStream.push(null);

    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      readableStream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    } else if (
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.originalname.endsWith(".xlsx")
    ) {
      try {
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Unsupported file type. Please upload a CSV or XLSX file."));
    }
  });
};

export const handleAIAnalysis: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const dataset = await parseFile(req.file);
    const { question, datasetName, datasetDescription }: AIAnalysisRequest = req.body;

    if (!question || !dataset || !Array.isArray(dataset)) {
      return res.status(400).json({
        error: "Missing required fields: question and a valid dataset file are required.",
      });
    }

    // Get OpenAI client (lazy-loaded)
    const openai = getOpenAIClient();

    // Prepare the dataset summary for the AI
    const datasetSummary = {
      name: datasetName,
      description: datasetDescription,
      recordCount: dataset.length,
      columns: dataset.length > 0 ? Object.keys(dataset[0]) : [],
      sampleData: dataset.slice(0, 3), // First 3 records as sample
    };

    // Create a comprehensive prompt for the AI
    const systemPrompt = `You are a business data analyst AI assistant. You help users analyze their business datasets and provide insights, trends, and recommendations.

Dataset Information:
- Name: ${datasetSummary.name}
- Description: ${datasetSummary.description}
- Total Records: ${datasetSummary.recordCount}
- Columns: ${datasetSummary.columns.join(', ')}

Sample Data:
${JSON.stringify(datasetSummary.sampleData, null, 2)}

Instructions:
1. Analyze the user's question in the context of this business dataset
2. Provide clear, actionable insights based on the data
3. If the question requires calculations, perform them based on the provided data
4. Focus on business implications and recommendations
5. If you cannot answer based on the provided data, explain what additional information would be needed
6. Keep responses concise but comprehensive
7. Use business terminology appropriate for entrepreneurs and business owners`;

    const userPrompt = `Based on the dataset provided above, please answer this question: ${question}

Please provide:
1. A direct answer to the question
2. Key insights from the data
3. Business recommendations if applicable
4. Any trends or patterns you notice`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        error: "Failed to get response from AI model.",
      });
    }

    // Parse the response to extract insights if possible
    const insights = extractInsights(aiResponse);

    const response: AIAnalysisResponse = {
      answer: aiResponse,
      insights: insights,
    };

    res.json(response);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    
    if (error instanceof Error) {
      res.status(500).json({
        error: `AI Analysis failed: ${error.message}`,
      });
    } else {
      res.status(500).json({
        error: "An unexpected error occurred during AI analysis.",
      });
    }
  }
};

// Helper function to extract key insights from AI response
function extractInsights(response: string): string[] {
  const insights: string[] = [];
  
  // Look for numbered lists or bullet points
  const lines = response.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match numbered items (1., 2., etc.) or bullet points (-, *, •)
    if (/^(\d+\.|[-*•])\s+/.test(trimmed)) {
      const insight = trimmed.replace(/^(\d+\.|[-*•])\s+/, '').trim();
      if (insight.length > 10) { // Only include substantial insights
        insights.push(insight);
      }
    }
  }
  
  // If no structured insights found, try to extract sentences with key business terms
  if (insights.length === 0) {
    const sentences = response.split(/[.!?]+/);
    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (trimmed.length > 20 && 
          (trimmed.includes('increase') || 
           trimmed.includes('decrease') || 
           trimmed.includes('trend') || 
           trimmed.includes('recommend') ||
           trimmed.includes('suggest') ||
           trimmed.includes('growth') ||
           trimmed.includes('performance'))) {
        insights.push(trimmed);
      }
    }
  }
  
  return insights.slice(0, 5); // Limit to 5 key insights
}

export const uploadMiddleware = upload.single("dataset");
