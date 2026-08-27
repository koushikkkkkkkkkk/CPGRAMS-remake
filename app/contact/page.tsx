"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../lib/i18n";

export default function ContactUs() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <section className="mx-auto w-full max-w-[800px] px-4 py-8 sm:px-6 md:px-8 md:py-16 font-sans text-foreground">
      
      <div className="mb-8 md:mb-12">
        <button 
          onClick={() => router.push('/')} 
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-border)] px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:opacity-80"
        >
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1">←</span> 
          {t("contact.back")}
        </button>
      </div>

      <header className="mb-10 text-center md:mb-14">
        <h1 className="mb-3 text-4xl font-medium tracking-tight text-foreground md:text-5xl">{t("contact.title")}</h1>
        <p className="text-base leading-relaxed text-[var(--label-secondary)]">
          {t("contact.desc")}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        
        {/* Helpline Card */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--system-bg)] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="mb-4 text-4xl">📞</div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">{t("contact.helpline")}</h3>
            <p className="mb-8 text-sm leading-relaxed text-[var(--label-secondary)]">
              {t("contact.helplineDesc")}
            </p>
          </div>
          <a 
            href="tel:1800114000" 
            className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[var(--color-accent)] px-6 text-sm font-medium text-[#FFFFFF] transition-transform duration-200 hover:scale-[0.98] shadow-sm"
          >
            1800-11-4000
          </a>
        </div>

        {/* Email Card */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--system-bg)] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="mb-4 text-4xl">✉️</div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">{t("contact.email")}</h3>
            <p className="mb-8 text-sm leading-relaxed text-[var(--label-secondary)]">
              {t("contact.emailDesc")}
            </p>
          </div>
          <a 
            href="mailto:support@jansunwai.gov.in" 
            className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[var(--tertiary-bg)] border border-[var(--color-border)] px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:opacity-80"
          >
            support@jansunwai.gov.in
          </a>
        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--system-bg)] p-8 shadow-sm md:mt-10">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{t("contact.nodal")}</h2>
        <address className="font-sans text-sm leading-relaxed not-italic text-[var(--label-secondary)]">
          <strong className="font-semibold text-foreground">{t("contact.nodalDept")}</strong><br/>
          {t("contact.nodalAddressLine1")}<br/>
          {t("contact.nodalAddressLine2")}<br/>
          {t("contact.nodalAddressLine3")}
        </address>
      </div>

    </section>
  );
}
