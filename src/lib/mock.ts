import { Expert, Thread } from "./types";

export const experts: Expert[] = [
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

export const threads: Thread[] = [];
