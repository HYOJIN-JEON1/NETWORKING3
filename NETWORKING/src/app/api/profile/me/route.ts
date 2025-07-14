import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { portfolio: true },
  });
  if (!user) return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  const body = await req.json();
  const { name, kdtClass, email, github, bio, techStacks, interests, portfolio } = body;
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      kdtClass,
      email,
      github,
      bio,
      techStacks,
      interests,
      portfolio: {
        deleteMany: {},
        create: portfolio,
      },
    },
    include: { portfolio: true },
  });
  return NextResponse.json(user);
} 