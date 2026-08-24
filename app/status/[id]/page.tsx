"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getGrievanceStatus } from "../../../lib/supabase";

export default function PipelineStatusView() {
  const router = useRouter();
  const params = useParams();
  
  const [resolutionStatus, setResolutionStatus] = useState<"pending_citizen_approval" | "resolved" | "appealed">("pending_citizen_approval");
  const [isLoading, setIsLoading] = useState(true);
  const [grievanceData, setGrievanceData] = useState<any>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (params.id) {
        try {
          const data = await getGrievanceStatus(params.id as string);
          setGrievanceData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStatus();
  }, [params.id]);

  const handleApprove = () => setResolutionStatus("resolved");
  const handleAppeal = () => setResolutionStatus("appealed");

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-[#0A0A0A] text-[#EAEAEA] font-mono">[ FETCHING TELEMETRY... ]</div>;
  }

  if (!grievanceData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0A0A0A] text-[#EAEAEA] font-mono gap-4">
        <h1 className="text-3xl text-[#FF2A2A] font-bold">[ ERR: HASH NOT FOUND ]</h1>
        <button onClick={() => router.push('/status')} className="border border-[#EAEAEA] px-4 py-2 hover:bg-[#EAEAEA] hover:text-[#0A0A0A]">[ RETURN ]</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }} className="animate-fade-in">
      
      {/* LEFT COLUMN: PIPELINE */}
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div>
            <button onClick={() => router.push('/status')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginBottom: '2rem', border: 'none', backgroundColor: 'var(--tertiary-bg)' }}>
              ← Back to Hub
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-0.02em' }}>Pipeline Tracking</h1>
              <span style={{ 
                backgroundColor: resolutionStatus === 'resolved' ? 'rgba(48, 209, 88, 0.15)' : resolutionStatus === 'appealed' ? 'rgba(255, 69, 58, 0.15)' : 'rgba(255, 159, 10, 0.15)', 
                color: resolutionStatus === 'resolved' ? 'var(--system-green)' : resolutionStatus === 'appealed' ? 'var(--system-red)' : 'var(--system-orange)', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '30px', 
                fontSize: '0.9rem', 
                fontWeight: 600,
                border: `1px solid ${resolutionStatus === 'resolved' ? 'var(--system-green)' : resolutionStatus === 'appealed' ? 'var(--system-red)' : 'var(--system-orange)'}`
              }}>
                {resolutionStatus === 'resolved' ? 'VERIFIED' : resolutionStatus === 'appealed' ? 'VIGILANCE ESCALATION' : 'AWAITING APPROVAL'}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--label-secondary)', marginTop: '0.5rem' }}>
              Reference: <strong style={{ color: 'var(--system-blue)', letterSpacing: '0.05em' }}>#{grievanceData.tracking_id}</strong>
            </p>
          </div>
        </div>

        {/* CI/CD Pipeline Container */}
        <div style={{ position: 'relative', paddingLeft: '3rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Continuous Glowing Line */}
          <div style={{ 
            position: 'absolute', 
            left: '7px', 
            top: '20px', 
            bottom: '100px', 
            width: '2px', 
            background: resolutionStatus === 'appealed' ? 'linear-gradient(to bottom, var(--system-green) 0%, var(--system-green) 60%, var(--system-red) 100%)' : 'linear-gradient(to bottom, var(--system-green) 0%, var(--system-green) 60%, var(--system-orange) 100%)',
            boxShadow: '0 0 10px var(--system-green)'
          }}></div>

          {/* Node 1: Filed */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-3.3rem', top: '0.4rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '4px solid var(--system-green)', zIndex: 2, boxShadow: '0 0 10px var(--system-green)' }}></div>
            <div className="bento-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--system-green)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--label-primary)' }}>Grievance Ingested</h3>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Aug 23, 10:00 AM</span>
              </div>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--label-secondary)' }}>Payload received cryptographically via UI interface.</p>
            </div>
          </div>

          {/* Node 2: Routing & Independent CC */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-3.3rem', top: '0.4rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '4px solid var(--system-green)', zIndex: 2, boxShadow: '0 0 10px var(--system-green)' }}></div>
            <div className="bento-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--system-green)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--label-primary)' }}>Automated Independent Routing</h3>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Aug 23, 10:02 AM</span>
              </div>
              <p style={{ margin: '0.5rem 0 1rem 0', color: 'var(--label-secondary)', fontSize: '0.95rem' }}>AI routed payload to primary offender and CC'd the central independent auditor.</p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'var(--tertiary-bg)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--separator-color)', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--label-secondary)', textTransform: 'uppercase' }}>Primary Node</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--system-blue)', marginTop: '4px' }}>Ward 4 Officer</div>
                </div>
                <div style={{ backgroundColor: 'var(--tertiary-bg)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--system-green)', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--system-green)', textTransform: 'uppercase' }}>Independent CC</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--label-primary)', marginTop: '4px' }}>Central Auditing Bureau</div>
                </div>
              </div>
            </div>
          </div>

          {/* Node 3: Resolution Proposal */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-3.3rem', top: '0.4rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: `4px solid ${resolutionStatus === 'resolved' ? 'var(--system-green)' : 'var(--system-orange)'}`, zIndex: 2, boxShadow: `0 0 10px ${resolutionStatus === 'resolved' ? 'var(--system-green)' : 'var(--system-orange)'}` }}></div>
            <div className="bento-card" style={{ padding: '1.5rem', borderLeft: `4px solid ${resolutionStatus === 'resolved' ? 'var(--system-green)' : 'var(--system-orange)'}`, borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--label-primary)' }}>Resolution Proposed</h3>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Aug 24, 2:30 PM</span>
              </div>
              
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--tertiary-bg)', borderRadius: '12px', borderLeft: '4px solid var(--system-blue)' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--label-primary)' }}>Moderator Remarks (Officer Sharma)</strong>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--label-secondary)' }}>
                  "The leaking pipe has been repaired and the main valve replaced. However, we cannot pave the road immediately as the monsoon season restricts asphalt work. Temporary filling has been done. Permanent road repair is scheduled for October."
                </p>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(48, 209, 88, 0.1)', borderRadius: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                <span style={{ color: 'var(--system-green)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Computer Vision Verified Proof Photo</span>
              </div>
            </div>
          </div>

          {/* Node 4: Citizen Verification or Escalation */}
          {resolutionStatus === "pending_citizen_approval" && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-3.3rem', top: '2rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '4px solid var(--separator-color)', zIndex: 2 }}></div>
              <div className="bento-card" style={{ padding: '2.5rem', border: '1px solid var(--system-blue)', backgroundColor: 'var(--secondary-bg)', boxShadow: '0 20px 50px rgba(10, 132, 255, 0.15)' }}>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--system-blue)', marginBottom: '1rem', textAlign: 'center' }}>Dual-Key Verification Required</h2>
                <p style={{ fontSize: '1rem', color: 'var(--label-secondary)', marginBottom: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                  The nodal officer has proposed a resolution. The system cannot close this ticket until you cryptographically approve the fix.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button onClick={handleApprove} className="btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', backgroundColor: 'var(--system-green)', boxShadow: '0 10px 30px rgba(48, 209, 88, 0.2)' }}>
                    ✅ Verify & Close
                  </button>
                  <button onClick={handleAppeal} className="btn-secondary" style={{ padding: '1rem', fontSize: '1.1rem', color: 'var(--system-red)', border: '1px solid var(--system-red)' }}>
                    ⚠️ Reject & Escalate
                  </button>
                </div>
              </div>
            </div>
          )}

          {resolutionStatus === "appealed" && (
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', left: '-3.3rem', top: '1.5rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '4px solid var(--system-red)', zIndex: 2, boxShadow: '0 0 10px var(--system-red)' }}></div>
              <div className="bento-card text-center" style={{ padding: '2.5rem', border: '1px solid var(--system-red)', backgroundColor: 'rgba(255, 69, 58, 0.05)' }}>
                <h2 style={{ color: 'var(--system-red)', fontSize: '2rem', marginBottom: '0.5rem' }}>Vigilance Escalation Triggered</h2>
                <p style={{ fontSize: '1rem', color: 'var(--label-secondary)' }}>You rejected the resolution. This case has been automatically stripped from Ward 4 and forwarded to the <strong>Anti-Corruption Directorate</strong> for immediate review.</p>
              </div>
            </div>
          )}

          {resolutionStatus === "resolved" && (
            <div style={{ position: 'relative' }}>
               <div style={{ position: 'absolute', left: '-3.3rem', top: '1.5rem', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '4px solid var(--system-green)', zIndex: 2, boxShadow: '0 0 10px var(--system-green)' }}></div>
              <div className="bento-card text-center" style={{ padding: '2.5rem', border: '1px solid var(--system-green)', backgroundColor: 'rgba(48, 209, 88, 0.05)' }}>
                <h2 style={{ color: 'var(--system-green)', fontSize: '2rem', marginBottom: '0.5rem' }}>Pipeline Completed</h2>
                <p style={{ fontSize: '1rem', color: 'var(--label-secondary)' }}>Thank you for verifying. You keep the system accountable.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: SECURE AUDIT LOG */}
      <div>
        <div style={{ position: 'sticky', top: '120px' }}>
          <div className="bento-card" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--separator-color)', backgroundColor: 'var(--tertiary-bg)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--system-green)' }}></div>
              <strong style={{ fontSize: '1rem' }}>Secure Audit Log</strong>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--system-blue)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>E2E Encrypted</span>
            </div>
            
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--system-bg)' }}>
              
              <div style={{ alignSelf: 'center', fontSize: '0.75rem', color: 'var(--label-tertiary)' }}>Aug 23, 2026 - Signal Protocol Initiated</div>
              
              <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--label-secondary)', marginLeft: '8px' }}>Officer Sharma</span>
                <div style={{ backgroundColor: 'var(--tertiary-bg)', padding: '0.75rem 1rem', borderRadius: '18px', borderBottomLeftRadius: '4px', marginTop: '4px', fontSize: '0.95rem' }}>
                  Hello citizen. Can you provide the exact cross-street for the leaking pipe? GPS data shows MG Road but it's a long stretch.
                </div>
              </div>

              <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                <div style={{ backgroundColor: 'var(--system-blue)', color: 'white', padding: '0.75rem 1rem', borderRadius: '18px', borderBottomRightRadius: '4px', marginTop: '4px', fontSize: '0.95rem' }}>
                  Yes, it's right outside the State Bank building, near the traffic signal.
                </div>
              </div>

            </div>
            
            <div style={{ padding: '1rem', borderTop: '1px solid var(--separator-color)', backgroundColor: 'var(--tertiary-bg)' }}>
              <input type="text" className="input-field" placeholder="Send secure message..." style={{ borderRadius: '20px', padding: '0.75rem 1.25rem', backgroundColor: 'var(--system-bg)', fontSize: '0.9rem' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
