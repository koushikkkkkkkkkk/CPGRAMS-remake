"use client";

import { useState } from "react";

export default function OfficerDashboard() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"none" | "success">("none");

  const handleUpload = () => {
    setHasUploaded(true);
  };

  const runAiVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult("success");
    }, 2000);
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Nodal Officer Portal</span>
          <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-0.02em', marginTop: '0.5rem' }}>Ward 4 Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--tertiary-bg)', padding: '0.75rem 1.5rem', borderRadius: '30px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--system-green)' }}></div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>System Online</span>
        </div>
      </div>

      <div className="content-grid" style={{ gap: '2rem' }}>
        {/* Left Column: Ticket Details */}
        <div className="bento-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Active Resolution</h2>
            <span style={{ backgroundColor: 'var(--tertiary-bg)', color: 'var(--system-orange)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>#JANS-2026-8891X</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Citizen Grievance</span>
            <p style={{ marginTop: '0.5rem', fontSize: '1.1rem', backgroundColor: 'var(--system-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--separator-color)' }}>
              "There is a leaking water pipe near the main junction that has been wasting water for 3 days."
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target SLA</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--tertiary-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--system-orange)' }}></div>
              </div>
              <span style={{ fontSize: '0.9rem', color: 'var(--system-orange)', fontWeight: 600 }}>4 hrs remaining</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Verification Upload */}
        <div className="bento-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, marginBottom: '1.5rem' }}>Proof of Execution</h2>
          
          <div 
            style={{ 
              flex: 1, 
              border: '2px dashed var(--separator-color)', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: hasUploaded ? 'var(--tertiary-bg)' : 'transparent',
              padding: '2rem',
              textAlign: 'center',
              cursor: hasUploaded ? 'default' : 'pointer',
              marginBottom: '1.5rem'
            }}
            onClick={!hasUploaded ? handleUpload : undefined}
          >
            {hasUploaded ? (
              <div className="animate-fade-in">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                <p style={{ margin: 0, color: 'var(--system-green)', fontWeight: 600 }}>repair_completed_ward4.jpg</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--label-secondary)', marginTop: '0.5rem' }}>GPS: 28.6139° N, 77.2090° E</p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📥</div>
                <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Upload Site Photograph</strong>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.9rem' }}>Requires embedded EXIF GPS data</span>
              </div>
            )}
          </div>

          {hasUploaded && verificationResult === "none" && (
            <button 
              className="btn-primary animate-fade-in" 
              onClick={runAiVerification} 
              disabled={isVerifying}
              style={{ width: '100%', padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {isVerifying ? (
                <>
                  <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                  Running AI Vision Model...
                </>
              ) : (
                "Run AI Computer Vision Verification"
              )}
            </button>
          )}

          {verificationResult === "success" && (
            <div className="animate-fade-in" style={{ backgroundColor: 'rgba(48, 209, 88, 0.1)', border: '1px solid var(--system-green)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <strong style={{ color: 'var(--system-green)', fontSize: '1.1rem', display: 'block' }}>Vision Match Confirmed</strong>
              <p style={{ margin: 0, color: 'var(--system-green)', fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                Image matches complaint context (Water Pipe, Fresh Repair). Resolution proposed to citizen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
