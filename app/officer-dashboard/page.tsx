"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfficerDashboard() {
  const router = useRouter();
  const [resolutionText, setResolutionText] = useState("");
  const [isResolved, setIsResolved] = useState(false);

  const handleProposeResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionText.trim()) return;
    
    // In a real app, this updates the DB and notifies the citizen
    setIsResolved(true);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem', maxWidth: '1000px' }}>
      <div className="flex items-center justify-center mb-8" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem' }}>Officer Dashboard</h1>
          <p style={{ margin: 0 }}>Nodal Officer: Ward 4 (Municipal)</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <strong style={{ fontSize: '1.2rem', color: 'var(--success)' }}>GRAI Score: 92/100</strong>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>High Quality Resolution Tier</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Active Grievances List */}
        <div className="glass-card" style={{ alignSelf: 'start' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Active Inbox</h2>
          
          <div style={{ border: '2px solid var(--accent-primary)', borderRadius: 'var(--radius-sm)', padding: '1rem', cursor: 'pointer', backgroundColor: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>#JANS-2026-8891X</strong>
              <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--danger)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>Urgent</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
              "There is a leaking water pipe near the main junction..."
            </p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              Filed: 2 days ago
            </span>
          </div>

        </div>

        {/* Action Panel */}
        <div className="glass-card flex-col gap-4">
          <h2 style={{ fontSize: '1.2rem' }}>Action Required: #JANS-2026-8891X</h2>
          
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <strong>Citizen Identity:</strong> 
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)' }}>🔒 Anonymized (Whistleblower Protection Active)</span>
          </div>

          {!isResolved ? (
            <form onSubmit={handleProposeResolution} className="flex flex-col gap-4 mt-4">
              <label style={{ fontWeight: '600' }}>Propose Resolution & Request Closure</label>
              <p style={{ fontSize: '0.85rem', marginTop: '-0.5rem' }}>
                Per new guidelines, you cannot unilaterally close this ticket. Describe the action taken. The citizen must approve it.
              </p>
              
              <textarea
                className="textarea-field"
                placeholder="Describe exactly what was fixed..."
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                style={{ minHeight: '100px' }}
                required
              />

              <div style={{ backgroundColor: 'var(--accent-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                <strong>Automated API Proof Required:</strong>
                <p style={{ margin: 0, marginTop: '0.2rem' }}>
                  System detected this is a "Water Supply" issue. Validating with Municipal Inventory API...
                  <span style={{ color: 'var(--success)', display: 'block', marginTop: '0.5rem', fontWeight: '600' }}>✓ Valve Replacement Log Found.</span>
                </p>
              </div>

              <button type="submit" className="btn-primary mt-2">
                Send for Citizen Verification
              </button>
            </form>
          ) : (
            <div className="text-center mt-8 p-4" style={{ backgroundColor: 'var(--success)', color: 'white', borderRadius: 'var(--radius-sm)' }}>
              <h3>Resolution Proposed</h3>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.9 }}>
                The citizen has 14 days to verify. The SLA clock is paused.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
