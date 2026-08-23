"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LodgeGrievanceOS() {
  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [hasEvidence, setHasEvidence] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [step, setStep] = useState<"input" | "processing" | "review">("input");

  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // OS-style overlay state & Autosave
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const savedDraft = localStorage.getItem("civic_os_draft");
    if (savedDraft) setQuery(savedDraft);
  }, []);

  // Autosave query
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("civic_os_draft", query);
    }
  }, [query, isMounted]);

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery("There is a leaking water pipe near the main junction that has been wasting water for 3 days.");
      setIsListening(false);
    }, 1500);
  };

  const proceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setStep("processing");
    setTimeout(() => {
      setDescription(query);
      setStep("review");
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      localStorage.removeItem("civic_os_draft"); // clear draft on success
      router.push("/status/JANS-2026-8891X"); // Push to a specific status ID to show the pipeline
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <div style={{ padding: '4rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div 
        className="glass-card animate-fade-in" 
        style={{ 
          width: '100%', 
          maxWidth: step === 'input' ? '800px' : '900px',
          padding: '4rem',
          position: 'relative',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        <button 
          onClick={() => router.push('/')} 
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          ✕
        </button>

        {step === "input" && (
          <div className="flex flex-col gap-6 animate-fade-in text-center">
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎙️</div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Lodge a Grievance</h1>
              <p style={{ fontSize: '1.2rem' }}>Describe your problem naturally. AI will extract the context.</p>
            </div>

            <form onSubmit={proceedToReview} className="flex flex-col gap-6 w-full">
              <div style={{ position: 'relative' }}>
                <textarea
                  className="textarea-field"
                  placeholder="E.g. The street light on MG Road is broken..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ 
                    minHeight: '220px', 
                    fontSize: '1.25rem', 
                    padding: '2rem',
                    paddingBottom: '5rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--tertiary-bg)',
                    border: '1px solid var(--separator-color)'
                  }}
                  autoFocus
                />
                
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setHasEvidence(!hasEvidence)}
                    className="btn-secondary"
                    style={{ 
                      borderRadius: '30px',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: hasEvidence ? 'rgba(48, 209, 88, 0.15)' : 'var(--tertiary-bg)',
                      color: hasEvidence ? 'var(--system-green)' : 'var(--label-primary)',
                      border: hasEvidence ? '1px solid var(--system-green)' : '1px solid var(--separator-color)'
                    }}
                  >
                    {hasEvidence ? '📸 Evidence Attached' : '📎 Attach Photo/GPS'}
                  </button>

                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className="btn-secondary"
                    style={{ 
                      borderRadius: '30px',
                      padding: '0.75rem 2rem',
                      backgroundColor: isListening ? 'var(--system-red)' : 'var(--tertiary-bg)',
                      color: isListening ? 'white' : 'var(--label-primary)',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                  >
                    {isListening ? 'Listening...' : 'Hold to Speak'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '30px', backgroundColor: 'var(--label-primary)', color: 'var(--system-bg)' }}>
                  Analyze Intent →
                </button>
                <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textAlign: 'center' }}>
                  {query.length > 0 ? 'Draft autosaved' : ''}
                </span>
              </div>
            </form>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '400px', width: '100%' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--separator-color)', borderTop: '3px solid var(--system-blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h2 style={{ marginTop: '2rem', fontSize: '1.3rem', color: 'var(--label-secondary)', fontWeight: 500 }}>Parsing context and routing...</h2>
          </div>
        )}

        {step === "review" && (
          <div className="flex flex-col gap-6 animate-fade-in text-left w-full">
            <h1 style={{ fontSize: '2.5rem', borderBottom: '1px solid var(--separator-color)', paddingBottom: '1rem', width: '100%' }}>Review & Submit</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4 w-full">
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--separator-color)', padding: '1.5rem', borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Routed To</span>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--system-blue)' }}>Municipal Water Board</strong>
                  <span style={{ display: 'block', fontSize: '0.9rem', marginTop: '0.2rem', color: 'var(--label-secondary)' }}>Ward 4 Jurisdiction</span>
                </div>
                
                <div style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--separator-color)', padding: '1.5rem', borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extracted Intent</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    <span style={{ backgroundColor: 'rgba(10, 132, 255, 0.15)', color: 'var(--system-blue)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>Infrastructure</span>
                    <span style={{ backgroundColor: 'var(--system-red)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>Wastage</span>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--separator-color)', padding: '1.5rem', borderRadius: '16px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Validity Score</span>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginTop: '0.5rem', color: hasEvidence ? 'var(--system-green)' : 'var(--system-orange)' }}>
                    {hasEvidence ? 'High Confidence (94%)' : 'Low Confidence (42%)'}
                  </strong>
                  <span style={{ display: 'block', fontSize: '0.9rem', marginTop: '0.2rem', color: 'var(--label-secondary)' }}>
                    {hasEvidence ? 'Visual evidence attached.' : 'Text-only submission.'}
                  </span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Grievance Payload</label>
                <textarea
                  className="textarea-field"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ minHeight: '120px' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', border: '1px solid var(--separator-color)', borderRadius: '16px', backgroundColor: 'var(--tertiary-bg)' }}>
                <input 
                  type="checkbox" 
                  id="anonymous" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  style={{ width: '24px', height: '24px', cursor: 'pointer', accentColor: 'var(--system-blue)' }}
                />
                <div>
                  <label htmlFor="anonymous" style={{ fontWeight: '600', display: 'block', fontSize: '1.05rem', cursor: 'pointer', color: 'var(--label-primary)' }}>
                    Cryptographic Anonymity
                  </label>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--label-secondary)', marginTop: '0.2rem' }}>
                    Shields your PII from the investigating officer. Verification hash is retained by the central authority.
                  </p>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Securing Payload & Submitting...' : 'Confirm & Lodge Grievance'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
