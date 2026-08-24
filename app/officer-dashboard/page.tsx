type Ticket = { id: string; complainant: string; summary: string; ministry: string; urgency: "Critical" | "High" | "Standard"; sla: string; slaTone: string };

const tickets: Ticket[] = [
  { id: "JANS-2026-8891X", complainant: "Aarav Sharma", summary: "Water pipe leak at Main Junction", ministry: "Municipal Water Board", urgency: "Critical", sla: "04h 18m left", slaTone: "text-rose-600 dark:text-rose-400" },
  { id: "JANS-2026-8847K", complainant: "Meera Nair", summary: "Streetlight outage near clinic", ministry: "Urban Development", urgency: "High", sla: "2d 06h left", slaTone: "text-amber-600 dark:text-amber-400" },
  { id: "JANS-2026-8822P", complainant: "Kabir Singh", summary: "Waste collection skipped twice", ministry: "Sanitation Services", urgency: "High", sla: "3d 12h left", slaTone: "text-amber-600 dark:text-amber-400" },
  { id: "JANS-2026-8789M", complainant: "Priya Iyer", summary: "Pothole reported on Lake Road", ministry: "Public Works", urgency: "Standard", sla: "8d 04h left", slaTone: "text-emerald-600 dark:text-emerald-400" },
];

const metrics = [
  { label: "Total tickets", value: "248", trend: "+18 this week", color: "bg-blue-600 dark:bg-blue-500" },
  { label: "SLA breaches", value: "06", trend: "2 need attention", color: "bg-rose-500 dark:bg-rose-400" },
  { label: "Resolution index", value: "92.4%", trend: "+3.8% this month", color: "bg-emerald-500 dark:bg-emerald-400" },
];

const urgencyClasses: Record<Ticket["urgency"], string> = { 
  Critical: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:ring-rose-500/20", 
  High: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-500/20", 
  Standard: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-500/20" 
};

function UrgencyBadge({ urgency }: { urgency: Ticket["urgency"] }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${urgencyClasses[urgency]}`}>{urgency}</span>;
}

export default function OfficerDashboard() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 md:px-10 md:py-16">
      <header className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-blue-700 uppercase dark:text-blue-400">Nodal officer · Ward 4</p>
          <h1 className="mb-2 text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white md:text-5xl">Operations overview</h1>
          <p className="mb-0 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">A clear view of citizen requests and service-level commitments.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-900/20 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Systems operational
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {metrics.map((metric) => (
          <article key={metric.label} className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/40 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none md:p-8">
            <span className={`absolute top-0 left-0 h-full w-1 ${metric.color} transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none group-hover:w-1.5`} />
            <p className="mb-3 text-xs font-bold tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">{metric.label}</p>
            <div className="flex items-end justify-between gap-3">
              <strong className="text-4xl tabular-nums tracking-tight text-slate-950 dark:text-white">{metric.value}</strong>
              <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">{metric.trend}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/40 dark:border-white/10 dark:bg-zinc-950 dark:shadow-none md:block">
        <div className="flex items-center justify-between border-b border-slate-200/80 px-8 py-6 dark:border-white/10">
          <div>
            <h2 className="mb-1 text-xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white">Active ticket queue</h2>
            <p className="mb-0 text-sm text-slate-500 dark:text-slate-400">Prioritized by urgency and remaining SLA.</p>
          </div>
          <button type="button" className="rounded-xl border border-slate-200/80 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5">
            View all tickets
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead className="bg-slate-50/50 text-xs font-bold tracking-[0.1em] text-slate-500 uppercase dark:bg-[#0a0a0a]/50 dark:text-slate-400">
              <tr>
                <th className="px-8 py-5">Ticket ID</th>
                <th className="px-8 py-5">Complainant</th>
                <th className="px-8 py-5">Ministry</th>
                <th className="px-8 py-5">Urgency</th>
                <th className="px-8 py-5">SLA clock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:bg-slate-50/80 dark:hover:bg-white/5">
                  <td className="px-8 py-5 text-sm font-bold text-blue-700 dark:text-blue-400">#{ticket.id}</td>
                  <td className="px-8 py-5">
                    <p className="mb-0 text-sm font-bold text-slate-900 dark:text-white">{ticket.complainant}</p>
                    <p className="mb-0 mt-1 text-xs text-slate-500 dark:text-slate-400">{ticket.summary}</p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400">{ticket.ministry}</td>
                  <td className="px-8 py-5">
                    <UrgencyBadge urgency={ticket.urgency} />
                  </td>
                  <td className={`px-8 py-5 text-sm font-bold tabular-nums ${ticket.slaTone}`}>{ticket.sla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 md:hidden">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="mb-0 text-xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white">Active tickets</h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{tickets.length} assigned</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/10">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="relative p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 truncate text-base font-bold text-slate-950 dark:text-white">{ticket.summary}</p>
                    <p className="mb-0 text-xs text-slate-500 dark:text-slate-400">#{ticket.id} · {ticket.complainant}</p>
                  </div>
                  <UrgencyBadge urgency={ticket.urgency} />
                </div>
                <div className="mt-5 flex items-center justify-between pt-1">
                  <span className={`text-xs font-bold tabular-nums ${ticket.slaTone}`}>◷ {ticket.sla}</span>
                  <details className="group">
                    <summary className="cursor-pointer list-none rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none active:scale-[0.98] dark:bg-white dark:text-slate-950">
                      <span className="group-open:hidden">Quick action</span>
                      <span className="hidden group-open:inline">Close</span>
                    </summary>
                    <div className="absolute right-5 z-10 mt-2 w-48 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-zinc-950">
                      <button type="button" className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors duration-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/10">Open ticket</button>
                      <button type="button" className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors duration-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/10">Assign response</button>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
