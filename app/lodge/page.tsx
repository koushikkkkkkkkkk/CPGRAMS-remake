"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LodgeTerminal from "../components/LodgeTerminal";
import { submitGrievance } from "../../lib/supabase";

export default function LodgeGrievanceOS() {
  const router = useRouter();
  
  const [step, setStep] = useState<"input" | "processing" | "review">("input");

  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const proceedToReview = (submittedDescription: string) => {
    setStep("processing");
    setTimeout(() => {
      setDescription(submittedDescription);
      setStep("review");
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const trackingId = await submitGrievance({
        description,
        category: "Infrastructure"
      }, isAnonymous);
      
      localStorage.removeItem("civic_os_draft");
      router.push(`/status/${trackingId}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("System Error: Failed to execute operation.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-12 bg-[#0A0A0A] px-4 md:px-12 text-[#EAEAEA] font-mono">
      <div className="relative flex w-full max-w-[800px] flex-col border border-[#EAEAEA]/20 bg-[#121212] p-8 md:p-12">

        {step === "input" && (
          <div className="flex w-full flex-col animate-fade-in text-left">
            <p className="mb-6 text-sm tracking-wider text-[#EAEAEA]/60">
              WRITE NATURALLY. SYSTEM EXTRACTS LOC, INTENT, URGENCY.
            </p>
            <LodgeTerminal onSubmit={proceedToReview} />
          </div>
        )}

        {step === "processing" && (
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center animate-fade-in text-center">
            <div className="text-[#FF2A2A] text-4xl animate-pulse">|</div>
            <h2 className="mt-6 text-sm font-bold uppercase tracking-widest text-[#EAEAEA]">
              {">"} ROUTING AND ANALYZING...
            </h2>
          </div>
        )}

        {step === "review" && (
          <div className="flex w-full flex-col animate-fade-in text-left">
            <h1 className="mb-8 text-3xl font-black tracking-tighter uppercase font-sans text-[#EAEAEA]">
              Review Classification
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-[#EAEAEA]/20 bg-[#0A0A0A] p-6">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-[#FF2A2A] uppercase">ROUTED TO</span>
                  <strong className="mt-2 block text-lg font-bold tracking-tight text-[#EAEAEA] uppercase">Municipal Water Board</strong>
                  <span className="mt-1 block text-sm text-[#EAEAEA]/60 uppercase">Ward 4 Jurisdiction</span>
                </div>
                
                <div className="border border-[#EAEAEA]/20 bg-[#0A0A0A] p-6">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-[#FF2A2A] uppercase">EXTRACTED INTENT</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="border border-[#EAEAEA]/40 px-3 py-1 text-xs font-bold text-[#EAEAEA] uppercase">[ INFRASTRUCTURE ]</span>
                    <span className="border border-[#FF2A2A] px-3 py-1 text-xs font-bold text-[#FF2A2A] uppercase bg-[#FF2A2A]/10">[ WASTAGE ]</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-bold tracking-widest text-[#FF2A2A] uppercase">
                  FINAL PAYLOAD
                </label>
                <textarea
                  className="min-h-[140px] w-full resize-y border border-[#EAEAEA]/20 bg-[#0A0A0A] p-4 text-base leading-relaxed text-[#EAEAEA] outline-none focus:border-[#FF2A2A]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start gap-4 border border-[#EAEAEA]/20 bg-[#0A0A0A] p-6">
                <input 
                  type="checkbox" 
                  id="anonymous" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-1 h-5 w-5 appearance-none border border-[#EAEAEA] checked:bg-[#FF2A2A] checked:border-[#FF2A2A] cursor-pointer"
                />
                <div className="flex-1">
                  <label htmlFor="anonymous" className="block text-sm font-bold text-[#EAEAEA] cursor-pointer uppercase tracking-widest">
                    CRYPTOGRAPHIC ANONYMITY
                  </label>
                  <p className="mt-1 text-xs leading-relaxed text-[#EAEAEA]/60 uppercase tracking-wider">
                    Shields PII. Verification hash retained by central authority.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center border border-[#FF2A2A] bg-[#FF2A2A] px-8 py-5 text-sm font-bold text-white uppercase tracking-widest transition-colors hover:bg-transparent hover:text-[#FF2A2A] disabled:opacity-30"
              >
                {isSubmitting ? '[ SECURING... ]' : '[ CONFIRM & LODGE ]'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
