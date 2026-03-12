import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const RESERVED_USERNAMES = ["robin", "Robin"];

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    if (RESERVED_USERNAMES.includes(username)) {
      return NextResponse.json({ error: "That username is reserved." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already taken." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, passwordHash, isTeacher: false },
    });

    return NextResponse.json({ username: user.username, isTeacher: false });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
