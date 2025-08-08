"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, route to a mock thread id
    router.push(`/thread/t-hello-llm-hydra`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ask anything..."
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Question</label>
        <textarea
          className="w-full rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 min-h-32"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Provide context, constraints, and desired style..."
          required
        />
      </div>
      <button
        type="submit"
        className="rounded bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
      >
        Ask Hydra
      </button>
    </form>
  );
}
