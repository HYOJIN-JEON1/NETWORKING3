import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, comments: true },
    take: 20,
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const body = await req.json();
  const { type, title, content, fields, techStacks, dueDate } = body;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
  const post = await prisma.post.create({
    data: {
      authorId: user.id,
      type,
      title,
      content,
      fields,
      techStacks,
      dueDate: new Date(dueDate),
    },
  });
  return NextResponse.json(post);
} 