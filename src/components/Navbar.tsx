import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          LLM Hydra Warp
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/ask" className="hover:underline">Ask</Link>
          <Link href="/" className="hover:underline">Threads</Link>
        </nav>
      </div>
    </header>
  );
}
