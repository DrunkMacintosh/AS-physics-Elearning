import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    return NextResponse.json({ username: user.username, isTeacher: user.isTeacher });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
