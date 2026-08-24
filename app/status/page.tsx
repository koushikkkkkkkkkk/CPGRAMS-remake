"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusHub() {
  const router = useRouter();
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
      department: "Public Works Department (PWD)"
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
        return { label: "[ SOLVED ]", borderColor: "border-[#30D158]", textColor: "text-[#30D158]", bgColor: "bg-[#30D158]/5" };
      case "action_taken": 
        return { label: "[ ACTION TAKEN ]", borderColor: "border-[#FF9F0A]", textColor: "text-[#FF9F0A]", bgColor: "bg-[#FF9F0A]/5" };
      case "no_action": 
        return { label: "[ RECEIVED - NO ACTION ]", borderColor: "border-[#FF2A2A]", textColor: "text-[#FF2A2A]", bgColor: "bg-[#FF2A2A]/5" };
      default: 
        return { label: "[ UNKNOWN ]", borderColor: "border-[#EAEAEA]/20", textColor: "text-[#EAEAEA]/60", bgColor: "bg-transparent" };
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      // Basic format validation could go here
      router.push(`/status/${trackingId.trim()}`);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[600px] px-4 py-8 sm:px-6 md:px-8 md:py-24">
      
      <header className="mb-8 text-center md:mb-12">
        <h1 className="mb-3 text-4xl font-bold tracking-[-0.04em] text-[#EAEAEA] md:text-5xl uppercase font-sans">
          [ TRACK INCIDENT ]
        </h1>
        <p className="text-base leading-relaxed text-[#EAEAEA]/60 font-mono tracking-widest uppercase">
          Enter your CPG-XXXXXXXX hash to trace the pipeline execution.
        </p>
      </header>

      <div className="border border-[#EAEAEA]/20 bg-[#121212] p-8 text-[#EAEAEA] font-mono">
        <form onSubmit={handleSearch} className="flex flex-col gap-6">
          <div>
            <label htmlFor="trackingId" className="mb-3 block text-sm font-bold tracking-widest text-[#FF2A2A] uppercase">
              TRACKING HASH
            </label>
            <input
              id="trackingId"
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="e.g. CPG-A1B2C3D4"
              className="w-full border border-[#EAEAEA]/20 bg-[#0A0A0A] p-4 text-base sm:text-lg text-[#EAEAEA] outline-none focus:border-[#FF2A2A] transition-colors placeholder:text-[#EAEAEA]/30 min-h-[56px]"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={!trackingId}
            className="w-full border border-[#EAEAEA] bg-[#EAEAEA] px-8 py-4 min-h-[56px] text-sm font-bold text-[#0A0A0A] uppercase tracking-widest hover:bg-transparent hover:text-[#EAEAEA] disabled:opacity-30 transition-colors mt-2"
          >
            [ EXECUTE SEARCH ]
          </button>
        </form>
      </div>

      {/* Recent Activity List */}
      <div className="mt-16 font-mono">
        <h2 className="mb-6 text-sm font-bold tracking-widest text-[#EAEAEA]/60 uppercase">
          /// RECENT CACHE
        </h2>
        <div className="flex flex-col gap-4">
          {recentGrievances.map((g) => {
            const styles = getStatusStyles(g.status);
            
            return (
              <div 
                key={g.id} 
                onClick={() => router.push(`/status/${g.id}`)}
                className={`group relative flex cursor-pointer flex-col p-6 transition-all duration-300 hover:bg-[#1A1A1A] border-2 ${styles.borderColor} ${styles.bgColor}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap mb-4">
                  <strong className="text-sm font-bold tracking-wider text-[#EAEAEA]">#{g.id}</strong>
                  <span className={`inline-flex px-2 py-1 text-xs font-bold ${styles.textColor}`}>
                    {styles.label}
                  </span>
                </div>
                
                <h3 className="mb-2 text-lg font-bold tracking-[-0.02em] text-[#EAEAEA] uppercase">{g.title}</h3>
                <p className="text-sm text-[#EAEAEA]/60 uppercase tracking-widest">
                  {g.department} <span className="mx-2 text-[#FF2A2A] font-bold">|</span> {g.date}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
