"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function LoginOS() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");

  const handleDemoFill = () => {
    setEmail("citizen@samadhan.gov.in");
    setPassword("DemoCitizen123!");
    setError("");
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError("");

    try {
      // 1. Try to sign in
      let { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 2. If it fails with invalid credentials, it might be a new demo user. Let's auto-signup for the hackathon.
      if (signInError && signInError.message.includes("Invalid login")) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        data = signUpData as any;
      } else if (signInError) {
        throw signInError;
      }

      // Success! Redirect to home
      router.push("/");
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 font-sans text-foreground">
      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex justify-center">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[var(--color-accent)] opacity-10 blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[var(--system-blue)] opacity-10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] animate-fade-in overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--system-bg)]/80 p-8 shadow-2xl backdrop-blur-3xl sm:p-10">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--tertiary-bg)] border border-[var(--color-border)] shadow-inner">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent)]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">SAMADHAN Login</h1>
          <p className="text-sm font-medium text-[var(--label-secondary)]">Sign in to access your civic dashboard</p>
        </div>

        <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block pl-1 text-xs font-semibold uppercase tracking-wider text-[var(--label-secondary)]">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--tertiary-bg)] px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-[var(--label-tertiary)] focus:border-[var(--color-accent)] focus:bg-[var(--system-bg)]" 
              placeholder="name@example.com" 
              required 
            />
          </div>
          <div>
            <label className="mb-2 block pl-1 text-xs font-semibold uppercase tracking-wider text-[var(--label-secondary)]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--tertiary-bg)] px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-[var(--label-tertiary)] focus:border-[var(--color-accent)] focus:bg-[var(--system-bg)]" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          {error && (
            <div className="rounded-lg border border-[var(--system-red)]/20 bg-[var(--system-red)]/10 px-4 py-3 text-xs font-medium text-[var(--system-red)]">
              {error}
            </div>
          )}

          <div className="mt-2">
            <button 
              type="submit" 
              disabled={isAuthenticating}
              className="w-full rounded-xl bg-foreground px-4 py-3.5 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-foreground/10"
            >
              {isAuthenticating ? "Authenticating..." : "Continue"}
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="text-xs font-semibold text-[var(--label-tertiary)] uppercase tracking-wider">For Reviewers</span>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
          <button 
            type="button" 
            onClick={handleDemoFill}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--tertiary-bg)] px-4 py-2 text-xs font-semibold text-[var(--label-secondary)] transition-colors hover:bg-[var(--system-bg)] hover:text-foreground"
          >
            Use Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
