import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { answer, question, solution, maxMark = 3 } = await req.json();

    if (!answer?.trim()) {
      return NextResponse.json({ error: "No answer provided" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `You are a Cambridge AS Physics examiner. Grade concisely.

Question: ${question}
Model solution: ${solution}
Student answer (LaTeX): ${answer}

Respond ONLY:
MARK: X/${maxMark}
FEEDBACK: [2-3 sentences]`,
        },
      ],
      max_tokens: 600,
    });

    const txt = completion.choices[0]?.message?.content ?? "Error.";
    const mark = parseInt(txt.match(/MARK:\s*(\d+)/)?.[1] ?? "0");
    const feedback = txt
      .replace(/MARK:\s*\d+\/\d+\s*\n?/, "")
      .replace("FEEDBACK:", "")
      .trim();

    return NextResponse.json({
      mark: Math.min(mark, maxMark),
      maxMark,
      feedback,
      raw: txt,
    });
  } catch (err) {
    console.error("Grade error:", err);
    return NextResponse.json({ error: "Grading failed" }, { status: 500 });
  }
}
