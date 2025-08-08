import { db } from "@/lib/db";
import { ResponseVariant } from "@/lib/types";

export default async function ExpertResponse({ response }: { response: ResponseVariant }) {
  const expert = await db.expert.findUnique({ where: { id: response.expertId } });
  if (!expert) return null;
  return (
    <div className="rounded border border-black/10 dark:border-white/10 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="font-semibold">{expert?.name}</span>{" "}
          <span className="text-black/60 dark:text-white/60">{expert?.username}</span>
        </div>
        <div className="text-xs uppercase tracking-wide opacity-70">{response.style}</div>
      </div>
      <p className="text-sm leading-6 whitespace-pre-wrap">{response.content}</p>
      <div className="text-xs text-black/60 dark:text-white/60">Votes: {response.votes}</div>
    </div>
  );
}
