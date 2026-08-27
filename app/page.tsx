"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../lib/i18n";

export default function CitizenPortal() {
  const router = useRouter();
  const { t } = useTranslation();

  const citizenStats = [
    { label: t("home.stat1Label"), value: "18,240", detail: t("home.stat1Detail") },
    { label: t("home.stat2Label"), value: "4.2 days", detail: t("home.stat2Detail") },
    { label: t("home.stat3Label"), value: "92%", detail: t("home.stat3Detail") },
  ];

  function handleLodgeReport() {
    router.push("/lodge");
  }

  return (
    <div className="w-full px-4 py-24 sm:px-6 md:py-32 font-sans text-foreground bg-background min-h-screen">
      
      {/* Hero & CTA Container */}
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center rounded-full bg-[var(--system-blue)]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-accent)] uppercase">
          {t("home.tagline")}
        </span>
        
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight">
          {t("home.heroTitle")}
        </h1>
        
        <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-[var(--label-secondary)]">
          {t("home.heroDesc")}
        </p>

        {/* Primary CTA Section */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLodgeReport}
            className="flex min-h-[56px] min-w-[240px] items-center justify-center rounded-md bg-foreground px-8 text-base font-medium text-background transition-transform duration-200 hover:scale-[0.98] active:scale-95 shadow-sm"
          >
            {t("home.logReport")}
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="mx-auto mt-32 max-w-4xl text-left bg-[var(--system-bg)] rounded-xl border border-[var(--color-border)] p-8 sm:p-12 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          {t("home.aboutTitle")}
        </h2>
        
        <div className="space-y-6 text-[var(--label-secondary)] text-base leading-[1.6]">
          <p>
            {t("home.aboutP1")}
          </p>
          <p>
            {t("home.aboutP2")}
          </p>
        </div>

        <hr className="my-10 border-t border-[var(--color-border)]" />

        <h3 className="mb-6 text-lg font-semibold text-foreground">
          {t("home.issuesNotCoveredTitle")}
        </h3>
        <p className="mb-4 text-[var(--label-secondary)] text-sm">{t("home.issuesNotCoveredDesc")}</p>
        <ul className="space-y-3 text-[var(--label-secondary)] text-base list-disc ml-5 marker:text-[var(--color-border)]">
          <li>{t("home.issuesList1")}</li>
          <li>{t("home.issuesList2")}</li>
          <li>{t("home.issuesList3")}</li>
          <li>{t("home.issuesList4")}</li>
        </ul>
      </div>

      {/* Benefits / Stats */}
      <div className="mx-auto max-w-4xl mt-24 grid gap-8 sm:grid-cols-3 border-t border-[var(--color-border)] pt-16 text-center">
        {citizenStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl font-medium text-foreground tracking-tight">{stat.value}</span>
            <span className="mt-2 text-sm font-semibold text-[var(--color-accent)]">{stat.label}</span>
            <span className="mt-1 text-xs text-[var(--label-secondary)]">{stat.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
