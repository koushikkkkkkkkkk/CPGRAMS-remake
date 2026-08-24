"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const citizenStats = [
  { label: "Resolved this month", value: "18,240", detail: "Across all departments" },
  { label: "Average response", value: "4.2 days", detail: "Transparent tracking" },
  { label: "Citizen satisfaction", value: "92%", detail: "Verified resolutions" },
];

export default function CitizenPortal() {
  const router = useRouter();

  function handleLodgeReport() {
    router.push("/lodge");
  }

  return (
    <div className="w-full px-4 py-12 sm:px-6 md:py-24 font-mono">
      
      {/* Hero & CTA Container (Centered, 3xl) */}
      <div className="mx-auto max-w-3xl text-center">
        {/* Hero Section */}
        <span className="inline-flex items-center border border-[#EAEAEA]/20 bg-[#121212] px-3 py-1 text-xs font-bold tracking-widest text-[#FF2A2A] uppercase">
          [ CITIZEN PORTAL ]
        </span>
        
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#EAEAEA] uppercase font-sans tracking-tight">
          Your voice moves public service forward.
        </h1>
        
        <p className="mt-6 mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#EAEAEA]/60 uppercase tracking-widest">
          Lodge a grievance in plain language. We route it to the right authority and keep every step visible.
        </p>

        {/* Primary CTA Section */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLodgeReport}
            className="flex min-h-[64px] min-w-[300px] items-center justify-center border-2 border-[#EAEAEA] bg-[#EAEAEA] px-8 text-lg font-bold text-[#0A0A0A] uppercase tracking-widest transition-all duration-300 hover:bg-transparent hover:text-[#EAEAEA] hover:border-[#FF2A2A] hover:shadow-[0_0_20px_rgba(255,42,42,0.3)]"
          >
            [ LOG A REPORT ]
          </button>
        </div>
      </div>

      {/* Information Section (Wider, 5xl) */}
      <div className="mx-auto mt-24 max-w-5xl text-left border border-[#EAEAEA]/20 bg-[#121212] p-8 sm:p-12 md:p-16">
        <h2 className="mb-6 text-2xl font-bold text-[#FF2A2A] uppercase tracking-widest">
          ABOUT CPGRAMS
        </h2>
        
        <div className="space-y-6 text-[#EAEAEA]/80 text-sm md:text-base leading-relaxed font-sans">
          <p>
            Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online platform available to the citizens 24x7 to lodge their grievances to the public authorities on any subject related to service delivery. It is a single portal connected to all the Ministries/Departments of Government of India and States. Every Ministry and States have role-based access to this system. CPGRAMS is also accessible to the citizens through standalone mobile application downloadable through Google Play store and mobile application integrated with UMANG.
          </p>
          <p>
            The status of the grievance filed in CPGRAMS can be tracked with the unique registration ID provided at the time of registration of the complainant. CPGRAMS also provides appeal facility to the citizens if they are not satisfied with the resolution by the Grievance Officer. After closure of grievance if the complainant is not satisfied with the resolution, he/ she can provide feedback. If the rating is 'Poor' the option to file an appeal is enabled. The status of the Appeal can also be tracked by the petitioner with the grievance registration number.
          </p>
        </div>

        <hr className="my-10 border-t border-[#EAEAEA]/20" />

        <h3 className="mb-6 text-lg font-bold text-[#FF2A2A] uppercase tracking-widest flex items-center gap-3">
          <span className="bg-[#FF2A2A] text-[#121212] px-2 py-1 text-xs">!</span>
          ISSUES WHICH ARE NOT TAKEN UP FOR REDRESS
        </h3>
        <ul className="space-y-3 text-[#EAEAEA]/80 text-sm md:text-base font-sans list-none">
          <li className="flex items-start gap-3">
            <span className="text-[#FF2A2A] font-mono mt-1">{">"}</span> RTI Matters
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF2A2A] font-mono mt-1">{">"}</span> Court related / Subjudice matters
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF2A2A] font-mono mt-1">{">"}</span> Religious matters
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#FF2A2A] font-mono mt-1">{">"}</span> Grievances of Government employees concerning their service matters including disciplinary proceedings etc. unless the aggrieved employee has already exhausted the prescribed channels keeping in view the DoPT OM No. 11013/08/2013-Estt.(A-III) dated 31.08.2015
          </li>
        </ul>

        <hr className="my-10 border-t border-[#EAEAEA]/20" />

        <h3 className="mb-6 text-lg font-bold text-[#EAEAEA] uppercase tracking-widest">
          /// NOTE
        </h3>
        <ol className="space-y-4 text-[#EAEAEA]/60 text-sm md:text-base font-sans list-decimal list-outside ml-5">
          <li className="pl-2">
            If you have not got a satisfactory redress of your grievance within a reasonable period of time, relating to Ministries/Departments and Organisations under the purview of Directorate of Public Grievances(DPG), Cabinet Secretariat, GOI, you may seek help of DPG in resolution.
          </li>
          <li className="pl-2">
            Government is not charging fee from the public for filing grievances. All money being paid by the public for filing grievance is going only to M/s CSC only.
          </li>
        </ol>
      </div>

      {/* Benefits / Stats (Centered, 3xl) */}
      <div className="mx-auto max-w-3xl mt-24 grid gap-8 sm:grid-cols-3 border-t border-[#EAEAEA]/20 pt-16 text-center">
        {citizenStats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[#EAEAEA]">{stat.value}</span>
            <span className="mt-2 text-sm font-bold text-[#FF2A2A] uppercase tracking-widest">{stat.label}</span>
            <span className="mt-1 text-xs text-[#EAEAEA]/60 uppercase tracking-widest">{stat.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
