import Navbar from "@/components/Navbar";
import ExpertResponse from "@/components/ExpertResponse";
import { db } from "@/lib/db";

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await db.thread.findUnique({
    where: { id: params.id },
    include: { responses: { include: { expert: true }, orderBy: { createdAt: "asc" } } },
  });

  if (!thread) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <p>Thread not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">{thread.title}</h1>
          <p className="text-black/70 dark:text-white/70">{thread.question}</p>
          <div className="text-xs text-black/50 dark:text-white/50 flex gap-2">
            <span>{new Date(thread.createdAt).toLocaleString()}</span>
          </div>
        </header>
        <section className="space-y-4">
          {thread.responses.map((r) => (
            <ExpertResponse key={r.id} response={{
              id: r.id,
              expertId: r.expertId,
              content: r.content,
              style: (r.style as any) ?? "concise",
              expandedLevel: r.expandedLevel,
              votes: r.votes,
            }} />
          ))}
        </section>
      </main>
    </div>
  );
}
