"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginOS() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setStep("otp");
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div 
        className="bento-card animate-fade-in" 
        style={{ 
          width: '100%', 
          maxWidth: '440px', 
          padding: '3rem 2rem',
          backdropFilter: 'saturate(180%) blur(40px)',
          WebkitBackdropFilter: 'saturate(180%) blur(40px)',
          background: 'var(--material-regular)',
          border: '1px solid var(--glass-border)',
          borderRadius: '32px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {step === "credentials" ? "SAMADHAN Login" : "Two-Factor Auth"}
          </h1>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>
            {step === "credentials" ? "Authenticate via National ID" : "Enter the verification code sent to your device"}
          </p>
        </div>

        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-4 animate-fade-in">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--label-secondary)', marginBottom: '0.5rem', fontWeight: 500, paddingLeft: '4px' }}>Aadhaar / National ID</label>
              <input type="text" className="input-field" placeholder="XXXX-XXXX-XXXX" required style={{ backgroundColor: 'var(--material-thin)', border: '1px solid var(--separator-color)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--label-secondary)', marginBottom: '0.5rem', fontWeight: 500, paddingLeft: '4px' }}>Passcode</label>
              <input type="password" className="input-field" placeholder="••••••••" required style={{ backgroundColor: 'var(--material-thin)', border: '1px solid var(--separator-color)' }} />
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '16px', background: 'var(--system-blue)' }} disabled={isAuthenticating}>
              {isAuthenticating ? "Verifying..." : "Continue"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 animate-fade-in">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--label-secondary)', marginBottom: '0.5rem', fontWeight: 500, paddingLeft: '4px', textAlign: 'center' }}>One-Time Password</label>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {[1,2,3,4,5,6].map((i) => (
                  <input key={i} type="text" maxLength={1} className="input-field" style={{ width: '45px', height: '55px', textAlign: 'center', fontSize: '1.5rem', padding: 0, backgroundColor: 'var(--material-thin)', border: '1px solid var(--separator-color)', borderRadius: '12px' }} required />
                ))}
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '2rem', padding: '1rem', borderRadius: '16px', background: 'var(--system-blue)' }} disabled={isAuthenticating}>
              {isAuthenticating ? "Authenticating..." : "Verify & Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
