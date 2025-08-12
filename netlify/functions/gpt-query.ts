import type { Handler } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const handler: Handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No request body" }),
      };
    }

    const { datasetSummary, question } = JSON.parse(event.body);

    if (!datasetSummary || !question) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing datasetSummary or question" }),
      };
    }

    const messages: Message[] = [
      {
        role: "system",
        content:
          "You are an AI data analyst. Use the dataset summary to answer user questions precisely.",
      },
      {
        role: "user",
        content: `Dataset summary:\n${datasetSummary}\n\nUser question:\n${question}`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.3,
    });

    const answer = completion.choices[0].message?.content || "No answer";

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
};
