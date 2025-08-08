import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AI, GeneratedPersona } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { threadId, expertId, style } = body ?? {};
  if (!threadId || !expertId) {
    return NextResponse.json({ error: "Missing threadId or expertId" }, { status: 400 });
  }

  const [thread, expert] = await Promise.all([
    db.thread.findUnique({ where: { id: threadId } }),
    db.expert.findUnique({ where: { id: expertId } }),
  ]);

  if (!thread) return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  if (!expert) return NextResponse.json({ error: "Expert not found" }, { status: 404 });

  const persona: GeneratedPersona = {
    name: expert.name,
    username: expert.username,
    bio: expert.bio ?? "",
    expertise: Array.isArray(expert.expertise) ? (expert.expertise as unknown as string[]) : [],
    tone: (expert.tone as any) ?? "concise",
  };

  const { content, style: resolvedStyle } = await AI.generateAnswer({
    question: thread.question,
    persona,
    style,
  });

  const created = await db.response.create({
    data: {
      threadId: thread.id,
      expertId: expert.id,
      content,
      style: resolvedStyle,
    },
  });

  return NextResponse.json({ id: created.id, content, style: resolvedStyle }, { status: 201 });
}
