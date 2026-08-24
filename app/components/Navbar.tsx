"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "[ HOME ]" },
    { href: "/lodge", label: "[ LODGE ]" },
    { href: "/status", label: "[ STATUS ]" },
    { href: "/contact", label: "[ CONTACT ]" },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#EAEAEA]/20 bg-[#0A0A0A] px-6 py-4 font-mono text-[#EAEAEA]">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold tracking-tighter text-[#FF2A2A]">CMPGRAMS</span>
          
          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-4 border-l border-[#EAEAEA]/20 pl-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest transition-colors hover:text-[#FF2A2A] ${
                  pathname === link.href ? "text-[#FF2A2A]" : "text-[#EAEAEA]/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Desktop Utility Actions */}
        <div className="flex items-center gap-6 text-sm tracking-widest">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button className="hidden sm:block text-[#EAEAEA]/60 hover:text-[#FF2A2A] transition-colors">
            [ ALERT ]
          </button>
          
          {/* Mobile Menu Button (Hamburger) */}
          <button 
            className="sm:hidden text-[#EAEAEA]/60 hover:text-[#FF2A2A] transition-colors uppercase font-bold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "[ X ]" : "[ MENU ]"}
          </button>

          <Link href="/login" className="bg-[#EAEAEA] text-[#0A0A0A] px-3 py-1 font-bold hover:bg-[#FF2A2A] hover:text-white transition-colors">
            USER:KA
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[#0A0A0A] sm:hidden flex flex-col font-mono animate-fade-in border-b border-[#EAEAEA]/20">
          <div className="flex flex-col p-6 gap-6 text-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`tracking-widest transition-colors hover:text-[#FF2A2A] min-h-[48px] flex items-center border-b border-[#EAEAEA]/10 pb-4 ${
                  pathname === link.href ? "text-[#FF2A2A]" : "text-[#EAEAEA]/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between min-h-[48px] border-b border-[#EAEAEA]/10 pb-4">
              <span className="tracking-widest text-[#EAEAEA]/60">THEME</span>
              <ThemeToggle />
            </div>
            <button className="text-left tracking-widest text-[#FF2A2A] min-h-[48px] border-b border-[#EAEAEA]/10 pb-4">
              [ EMERGENCY ALERT ]
            </button>
          </div>
        </div>
      )}
    </>
  );
}
