import Link from "next/link";
import { threads } from "@/lib/mock";

export default function ThreadList() {
  return (
    <ul className="divide-y divide-black/10 dark:divide-white/10">
      {threads.map((t) => (
        <li key={t.id} className="py-4">
          <Link href={`/thread/${t.id}`} className="block">
            <h3 className="text-base font-semibold mb-1">{t.title}</h3>
            <p className="text-sm text-black/70 dark:text-white/70 line-clamp-2">{t.question}</p>
            <div className="mt-2 text-xs text-black/50 dark:text-white/50 flex gap-2">
              <span>{new Date(t.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{t.responses.length} expert replies</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
