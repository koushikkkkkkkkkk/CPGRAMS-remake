"use client";

import { useRouter } from "next/navigation";

export default function ContactUs() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[800px] px-4 py-8 sm:px-6 md:px-8 md:py-16">
      
      <div className="mb-8 md:mb-12">
        <button 
          onClick={() => router.push('/')} 
          className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors duration-500 motion-reduce:transition-none hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
        >
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1">←</span> 
          Back to Home
        </button>
      </div>

      <header className="mb-10 text-center md:mb-14">
        <h1 className="mb-3 text-4xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white md:text-5xl">Contact & Support</h1>
        <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
          We are here to assist you with the grievance redressal process.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        
        {/* Helpline Card */}
        <div className="flex flex-col items-center justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div>
            <div className="mb-4 text-5xl">📞</div>
            <h3 className="mb-2 text-xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white">Helpline</h3>
            <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Available 24x7 for assistance in all regional languages.
            </p>
          </div>
          <a 
            href="tel:1800114000" 
            className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold tracking-wider text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 active:scale-[0.98]"
          >
            1800-11-4000
          </a>
        </div>

        {/* Email Card */}
        <div className="flex flex-col items-center justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-zinc-950">
          <div>
            <div className="mb-4 text-5xl">✉️</div>
            <h3 className="mb-2 text-xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white">Email Support</h3>
            <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              For technical issues related to the portal.
            </p>
          </div>
          <a 
            href="mailto:support@jansunwai.gov.in" 
            className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-slate-100 px-6 text-sm font-bold tracking-wider text-slate-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/30 active:scale-[0.98] dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            support@jansunwai.gov.in
          </a>
        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-950 md:mt-10">
        <h2 className="mb-4 text-lg font-bold tracking-[-0.02em] text-slate-950 dark:text-white">Nodal Agency Address</h2>
        <address className="font-sans text-sm leading-relaxed not-italic text-slate-500 dark:text-slate-400">
          <strong className="font-semibold text-slate-700 dark:text-slate-300">Department of Administrative Reforms and Public Grievances</strong><br/>
          5th Floor, Sardar Patel Bhavan,<br/>
          Parliament Street, New Delhi - 110001<br/>
          India
        </address>
      </div>

    </section>
  );
}
