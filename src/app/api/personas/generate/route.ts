import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AI } from "@/lib/ai";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { topic, tone, constraints } = body ?? {};
  if (!topic || typeof topic !== "string") {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }
  const persona = await AI.generatePersona({ topic, tone, constraints });

  // Ensure unique username if conflict
  let username = persona.username;
  let suffix = 1;
  // Try up to 10 variations
  while (await db.expert.findUnique({ where: { username } })) {
    username = `${persona.username}${suffix}`.slice(0, 24);
    suffix++;
    if (suffix > 10) break;
  }

  const created = await db.expert.create({
    data: {
      name: persona.name,
      username,
      bio: persona.bio,
      tone: persona.tone,
      expertise: persona.expertise,
    },
  });

  return NextResponse.json({ id: created.id, ...persona, username }, { status: 201 });
}
