import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
});

export async function POST(req: Request) {
  try {
    const { tasks, goal } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        { role: "system", content: "You are an AI workflow manager that helps organize SaaS tasks." },
        { role: "user", content: `Here are my tasks: ${tasks.join(", ")}. My goal: ${goal}` },
      ],
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
