"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../lib/i18n";

export default function StatusHub() {
  const router = useRouter();
  const { t } = useTranslation();
  const [trackingId, setTrackingId] = useState("");

  const recentGrievances = [
    {
      id: "JANS-2026-8891X",
      title: "Leaking water pipe near main junction",
      date: "Aug 23, 2026",
      status: "action_taken",
      department: "Water Supply & Sanitation"
    },
    {
      id: "JANS-2026-7732A",
      title: "Potholes on 4th Cross Road",
      date: "Aug 10, 2026",
      status: "solved",
      department: "Public Works Department"
    },
    {
      id: "JANS-2026-9910B",
      title: "Streetlights not working in Sector 5",
      date: "Aug 24, 2026",
      status: "no_action",
      department: "Electricity Board"
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "solved": 
        return { label: t("status.statusResolved"), cardBorder: "border-[#30D158]", textColor: "text-[#30D158]" };
      case "action_taken": 
        return { label: t("status.statusInProgress"), cardBorder: "border-[#FF9F0A]", textColor: "text-[#FF9F0A]" };
      case "no_action": 
        return { label: t("status.statusReceived"), cardBorder: "border-[#FF453A]", textColor: "text-[#FF453A]" };
      default: 
        return { label: t("status.statusUnknown"), cardBorder: "border-[#EAEAEA] dark:border-[#333333]", textColor: "text-[#787774] dark:text-[#A1A1AA]" };
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/status/${trackingId.trim()}`);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[640px] px-4 py-16 md:py-24 font-sans text-foreground">
      
      <header className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {t("status.title")}
        </h1>
        <p className="text-base text-[var(--label-secondary)]">
          {t("status.description")}
        </p>
      </header>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--system-bg)] p-8 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div>
            <label htmlFor="trackingId" className="mb-2 block text-sm font-semibold text-foreground">
              {t("status.refNumber")}
            </label>
            <input
              id="trackingId"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder={t("status.placeholder") as string}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--tertiary-bg)] p-3 text-base text-foreground outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--label-tertiary)]"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={!trackingId}
            className="w-full rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-sm"
          >
            {t("status.checkBtn")}
          </button>
        </form>
      </div>

      {/* Recent Activity List */}
      <div className="mt-16">
        <h2 className="mb-6 text-sm font-semibold text-[var(--label-secondary)]">
          {t("status.recentReports")}
        </h2>
        <div className="flex flex-col gap-4">
          {recentGrievances.map((g) => {
            const styles = getStatusStyles(g.status);
            
            return (
              <div 
                key={g.id} 
                onClick={() => router.push(`/status/${g.id}`)}
                className={`group relative flex cursor-pointer flex-col rounded-xl border-2 bg-[var(--system-bg)] p-6 transition-all duration-200 hover:shadow-md ${styles.cardBorder}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap mb-3">
                  <strong className="text-sm font-semibold text-[var(--label-secondary)]">{g.id}</strong>
                  <span className={`text-xs font-bold uppercase tracking-wider ${styles.textColor}`}>
                    {styles.label}
                  </span>
                </div>
                
                <h3 className="mb-2 text-lg font-medium text-foreground">{g.title}</h3>
                <p className="text-sm text-[var(--label-secondary)]">
                  {g.department} <span className="mx-2 text-[var(--color-border)]">|</span> {g.date}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
