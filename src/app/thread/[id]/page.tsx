import Navbar from "@/components/Navbar";
import ExpertResponse from "@/components/ExpertResponse";
import { threads } from "@/lib/mock";

export default function ThreadPage({ params }: { params: { id: string } }) {
  const thread = threads.find((t) => t.id === params.id);
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
            <span>•</span>
            <span>{thread.tags.join(", ")}</span>
          </div>
        </header>
        <section className="space-y-4">
          {thread.responses.map((r) => (
            <ExpertResponse key={r.id} response={r} />
          ))}
        </section>
      </main>
    </div>
  );
}
