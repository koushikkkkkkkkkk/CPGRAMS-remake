export default function RoutingResultCard({ result, routedTo }: { result: any; routedTo: string; intent: string }) {
  return <div className="grid gap-4 sm:grid-cols-2">
    <div className="rounded-xl border border-[var(--color-border)] bg-background p-6"><span className="text-xs font-semibold text-[var(--color-accent)] uppercase">{routedTo}</span><strong className="mt-2 block text-lg font-semibold">{result.department}</strong></div>
    <div className="rounded-xl border border-[var(--color-border)] bg-background p-6">
      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase">Tags & Urgency</span>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${result.urgencyLevel === 'High' ? 'bg-[var(--system-red)]/10 text-[var(--system-red)]' : 'bg-[var(--system-blue)]/10 text-[var(--color-accent)]'}`}>{result.urgencyLevel || "Normal"}</span>
        {result.tags?.slice(0, 3).map((tag: string, i: number) => (
          <span key={i} className="inline-flex items-center rounded-full bg-[var(--color-border)] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--label-secondary)]">{tag}</span>
        ))}
      </div>
    </div>
  </div>;
}
