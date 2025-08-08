// Next.js cannot resolve ts/esm path aliases in node scripts; use direct prisma client here
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const mockExperts = [
  {
    id: "exp-architect",
    name: "System Architect",
    username: "@arch",
    expertise: ["systems", "distributed", "microservices"],
    tone: "serious",
    bio: "Designs scalable systems and trade-offs.",
  },
  {
    id: "exp-researcher",
    name: "AI Researcher",
    username: "@ml",
    expertise: ["LLMs", "RAG", "agents"],
    tone: "concise",
    bio: "Grounded in current literature and benchmarks.",
  },
  {
    id: "exp-product",
    name: "Product Strategist",
    username: "@pm",
    expertise: ["UX", "growth", "roadmaps"],
    tone: "casual",
    bio: "Pragmatic product thinking for outcomes.",
  },
];

async function main() {
  const count = await db.expert.count();
  if (count === 0) {
    for (const e of mockExperts) {
      await db.expert.upsert({
        where: { id: e.id },
        update: {},
        create: {
          id: e.id,
          name: e.name,
          username: e.username,
          expertise: e.expertise,
          bio: e.bio ?? null,
          tone: e.tone ?? "concise",
        },
      });
    }
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

