"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import "../../lib/i18n";
import { supportedLanguages } from "../../lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/lodge", label: t("nav.lodge") },
    { href: "/status", label: t("nav.status") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--system-bg)]/80 backdrop-blur-md px-6 py-4 font-sans text-foreground">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground hover:text-[var(--color-accent)] transition-colors">
            CivicOS
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                  pathname === link.href ? "text-[var(--color-accent)]" : "text-[var(--label-secondary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Desktop Utility Actions */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <label className="hidden sm:block"><span className="sr-only">Language</span><select value={i18n.resolvedLanguage || "en"} onChange={(event) => { const lang = event.target.value; void i18n.changeLanguage(lang); localStorage.setItem("civicos_lang", lang); }} className="rounded-md border border-[var(--color-border)] bg-[var(--system-bg)] px-2 py-1 font-sans text-xs text-[var(--label-secondary)] outline-none focus:border-[var(--color-accent)]">{supportedLanguages.map((language) => <option key={language} value={language}>{language.toUpperCase()}</option>)}</select></label>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button className="hidden sm:block text-[var(--label-secondary)] hover:text-[var(--color-accent)] transition-colors">
            Alerts
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden text-[var(--label-secondary)] hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>

          <Link href="/login" className="bg-foreground text-background px-4 py-2 font-medium hover:opacity-80 transition-opacity shadow-sm">
            {t("nav.login")}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-[var(--system-bg)] sm:hidden flex flex-col font-sans animate-fade-in border-b border-[var(--color-border)]">
          <div className="flex flex-col p-6 gap-6 text-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors hover:text-[var(--color-accent)] min-h-[48px] flex items-center border-b border-[var(--color-border)] pb-4 ${
                  pathname === link.href ? "text-[var(--color-accent)] font-semibold" : "text-[var(--label-secondary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between min-h-[48px] border-b border-[var(--color-border)] pb-4 text-[var(--label-secondary)]">
              <span>Theme</span>
              <ThemeToggle />
            </div>
            <button className="text-left text-[var(--color-accent)] min-h-[48px] border-b border-[var(--color-border)] pb-4 font-semibold">
              Emergency Alert
            </button>
          </div>
        </div>
      )}
    </>
  );
}
