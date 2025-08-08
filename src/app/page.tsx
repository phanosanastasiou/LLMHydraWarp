import Navbar from "@/components/Navbar";
import ThreadList from "@/components/ThreadList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">LLM Hydra Warp</h1>
          <p className="text-black/70 dark:text-white/70">
            Ask any question and get diverse answers from multiple AI experts. Public, searchable, and interactive.
          </p>
        </section>
        <ThreadList />
      </main>
    </div>
  );
}
