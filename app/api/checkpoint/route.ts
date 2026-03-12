import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { answers, questions } = await req.json();

    const results: Record<string, { mark: number; maxMark: number; feedback: string }> = {};

    for (const [key, answer] of Object.entries(answers as Record<string, string>)) {
      const qInfo = questions[key];
      if (!qInfo) continue;

      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `Cambridge AS Physics examiner. Grade concisely.

Question: ${qInfo.stem}${qInfo.partLabel ? ` — Part ${qInfo.partLabel}: ${qInfo.question}` : ""} [${qInfo.marks} marks]
Mark scheme: ${qInfo.solution}
Student answer: ${answer}

Respond ONLY:
MARK: X/${qInfo.marks}
FEEDBACK: [1-2 sentences]`,
            },
          ],
          max_tokens: 400,
        });

        const txt = completion.choices[0]?.message?.content ?? "";
        const mark = Math.min(
          parseInt(txt.match(/MARK:\s*(\d+)/)?.[1] ?? "0"),
          qInfo.marks
        );
        const feedback = txt
          .replace(/MARK:\s*\d+\/\d+\s*\n?/, "")
          .replace("FEEDBACK:", "")
          .trim();

        results[key] = { mark, maxMark: qInfo.marks, feedback };
      } catch {
        results[key] = { mark: 0, maxMark: qInfo.marks, feedback: "Grading error." };
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Checkpoint grade error:", err);
    return NextResponse.json({ error: "Grading failed" }, { status: 500 });
  }
}
