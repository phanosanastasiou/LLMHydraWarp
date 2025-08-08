import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, question } = body ?? {};
  if (!title || !question) {
    return NextResponse.json({ error: "Missing title or question" }, { status: 400 });
  }

  const thread = await db.thread.create({ data: { title, question } });

  // For demo, create one response per expert placeholder
  const experts = await db.expert.findMany({ select: { id: true, tone: true } });
  await Promise.all(
    experts.map((e) =>
      db.response.create({
        data: {
          threadId: thread.id,
          expertId: e.id,
          content: `Placeholder ${e.id} will respond here with ${e.tone} style.`,
          style: e.tone,
        },
      })
    )
  );

  return NextResponse.json({ id: thread.id }, { status: 201 });
}

