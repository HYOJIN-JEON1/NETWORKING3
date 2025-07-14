import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, kdtClass, github } = await req.json();
  if (!name || !email || !password || !kdtClass || !github) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "이미 가입된 이메일" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      kdtClass,
      github,
    },
  });
  return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email } });
} 