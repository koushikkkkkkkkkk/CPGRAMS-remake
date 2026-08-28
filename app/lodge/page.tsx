"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../lib/i18n";
import LodgeTerminal from "../components/LodgeTerminal";
import RoutingResultCard from "../components/RoutingResultCard";
import { submitMaskedGrievance } from "../../lib/supabase";
import type { AppLanguage } from "../../lib/i18n";

export default function LodgeGrievanceOS() {
  const router = useRouter(); const { t, i18n } = useTranslation();
  const [step, setStep] = useState<"input" | "processing" | "review">("input");
  const [description, setDescription] = useState(""); const [title, setTitle] = useState("");
  const [analysis, setAnalysis] = useState<any>(null); const [masked, setMasked] = useState(true); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState("");
  const onAnalyze = async (raw: string) => { 
    setDescription(raw); 
    setStep("processing"); 
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: raw })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Analysis failed with status ${res.status}`);
      }
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      console.error(e);
      setAnalysis({ department: "General Grievance Cell", urgencyLevel: "Medium", tags: ["error"], englishTranslation: raw } as any);
    }
    setStep("review"); 
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (!analysis) return; setSubmitting(true); setError("");
    try { 
      const trackingHash = await submitMaskedGrievance({ 
        title: title.trim() || description.slice(0, 80), 
        description, 
        assignedDepartment: analysis.department, 
        isIdentityMasked: masked, 
        language: (i18n.resolvedLanguage || "en") as AppLanguage,
        urgencyLevel: (analysis as any).urgencyLevel,
        tags: (analysis as any).tags,
        englishTranslation: (analysis as any).englishTranslation
      }); 
      window.localStorage.removeItem("samadhan_draft"); 
      
      // Save to local storage for instant display in Status Hub (bypasses Supabase RLS)
      try {
        const stored = window.localStorage.getItem('recent_submissions');
        const recent = stored ? JSON.parse(stored) : [];
        recent.unshift({
          id: trackingHash,
          title: title.trim() || description.slice(0, 80),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'no_action',
          department: analysis.department
        });
        window.localStorage.setItem('recent_submissions', JSON.stringify(recent.slice(0, 3)));
      } catch (e) {}
      
      router.push(`/status/${trackingHash}`); 
    }
    catch (caught: any) {
      console.error("Submission error details:", caught);
      const msg = caught?.message || caught?.details || (typeof caught === 'string' ? caught : "Unable to save the report.");
      setError(msg);
      setSubmitting(false);
    }
  };
  return <div className="min-h-screen font-sans bg-background px-4 py-12 pt-28 text-foreground sm:px-8"><div className="mx-auto w-full max-w-4xl border border-[var(--color-border)] rounded-xl bg-[var(--system-bg)] shadow-sm p-4 sm:p-8">
    {step === "input" && <><p className="mb-6 text-sm text-[var(--label-secondary)]">{t("lodge.instruction")}</p><LodgeTerminal onAnalyze={onAnalyze} /></>}
    {step === "processing" && <div aria-busy="true" className="flex min-h-[400px] flex-col items-center justify-center"><div className="h-10 w-10 animate-spin border-2 border-[var(--color-accent)] border-t-transparent rounded-full" /><p className="mt-6 text-sm font-semibold">{t("review.processing")}</p></div>}
    {step === "review" && analysis && <form onSubmit={submit} className="font-sans"><h1 className="mb-8 text-3xl font-semibold tracking-tight">{t("lodge.reviewTitle")}</h1><RoutingResultCard result={analysis} routedTo={t("review.routedTo")} intent={t("review.intent")} />
      <div className="mt-8"><label htmlFor="title" className="mb-2 block text-xs font-semibold text-[var(--label-secondary)]">{t("lodge.titleLabel")}</label><input id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t("lodge.titlePlaceholder") as string} className="w-full rounded-md border border-[var(--color-border)] bg-background p-4 outline-none focus:border-[var(--color-accent)]" /></div>
      <div className="mt-6"><label htmlFor="payload" className="mb-2 block text-xs font-semibold text-[var(--label-secondary)]">{t("review.payload")}</label><textarea id="payload" value={description} onChange={(event) => setDescription(event.target.value)} required className="min-h-40 w-full rounded-md border border-[var(--color-border)] bg-background p-4 leading-7 outline-none focus:border-[var(--color-accent)]" /></div>
      <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-md border border-[var(--color-border)] bg-background p-5"><input type="checkbox" checked={masked} onChange={(event) => setMasked(event.target.checked)} className="mt-1 h-5 w-5 accent-[var(--color-accent)]" /><span><strong className="block text-sm font-medium">{t("review.mask")}</strong><small className="mt-1 block text-[var(--label-secondary)]">{t("review.maskHelp")}</small></span></label>
      {error && <p role="alert" className="mt-4 rounded-md border border-[var(--system-red)] p-3 text-sm text-[var(--system-red)] bg-[var(--system-red)]/10">{error}</p>}
      <button type="submit" disabled={submitting} className="mt-8 w-full rounded-md bg-foreground px-8 py-4 text-base font-medium text-background transition-transform duration-200 hover:scale-[0.98] active:scale-95 disabled:opacity-40">{submitting ? t("review.submitting") : t("review.submit")}</button>
    </form>}
  </div></div>;
}
