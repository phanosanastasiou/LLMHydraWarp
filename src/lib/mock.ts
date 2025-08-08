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

export const threads: Thread[] = [
  {
    id: "t-hello-llm-hydra",
    title: "How would you build an AI version of Reddit?",
    question:
      "I want multiple AI experts to answer and debate. What architecture would you propose?",
    createdAt: new Date().toISOString(),
    tags: ["architecture", "ai", "nextjs"],
    author: { id: "u-1", username: "@founder" },
    responses: [
      {
        id: "r1",
        expertId: "exp-architect",
        content:
          "Start with Next.js App Router, Postgres, server actions, and a message bus for async evals.",
        style: "serious",
        expandedLevel: 0,
        votes: 12,
      },
      {
        id: "r2",
        expertId: "exp-researcher",
        content:
          "Use MoE routing per sub-question; cache embeddings; add debate via structured prompting.",
        style: "concise",
        expandedLevel: 0,
        votes: 9,
      },
      {
        id: "r3",
        expertId: "exp-product",
        content:
          "Ship MVP: ask → multi-expert answers → TL;DR → debate toggle. Iterate with user feedback.",
        style: "casual",
        expandedLevel: 0,
        votes: 7,
      },
    ],
  },
];
