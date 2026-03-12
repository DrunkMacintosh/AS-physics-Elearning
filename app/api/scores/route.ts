import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: { isTeacher: false },
      select: { username: true },
    });

    const attempts = await prisma.attempt.findMany({
      include: { user: { select: { username: true } } },
    });

    // Build scores: { username: { questionId: mark } }
    const scores: Record<string, Record<string, number>> = {};
    for (const attempt of attempts) {
      const u = attempt.user.username;
      if (!scores[u]) scores[u] = {};
      scores[u][attempt.questionId] = attempt.mark;
    }

    return NextResponse.json({
      scores,
      students: students.map((s) => s.username),
    });
  } catch (err) {
    console.error("Scores error:", err);
    return NextResponse.json({ error: "Failed to fetch scores." }, { status: 500 });
  }
}
