"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getGrievanceStatus } from "../../../lib/supabase";

type TrackingRecord = {
  tracking_id: string;
  status: string;
  assigned_department: string | null;
  urgency_level?: string;
  tags?: string[];
  english_translation?: string;
  title?: string;
  description?: string;
};

export default function PipelineStatusView() {
  const router = useRouter();
  const params = useParams();
  
  const [resolutionStatus, setResolutionStatus] = useState<"pending_citizen_approval" | "resolved" | "appealed">("pending_citizen_approval");
  const [isLoading, setIsLoading] = useState(true);
  const [grievanceData, setGrievanceData] = useState<TrackingRecord | null>(null);

  const normaliseStatus = (status: string | null | undefined) =>
    (status || "RECEIVED").replace(/[_-]/g, " ");

  const statusTone = (status: string | null | undefined) => {
    const value = (status || "").toUpperCase();
    if (value === "RESOLVED" || value === "SOLVED") return "var(--system-green)";
    if (value.includes("APPEAL") || value.includes("REJECT")) return "var(--system-red)";
    return "var(--system-blue)";
  };

  useEffect(() => {
    const fetchStatus = async () => {
      if (params.id) {
        try {
          const data = await getGrievanceStatus(params.id as string) as TrackingRecord;
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
    return <div className="flex h-screen items-center justify-center bg-background text-[var(--label-secondary)] font-sans">Loading details...</div>;
  }

  if (!grievanceData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground font-sans gap-4">
        <h1 className="text-2xl font-semibold">Report Not Found</h1>
        <button onClick={() => router.push('/status')} className="rounded-md border border-[var(--color-border)] bg-[var(--system-bg)] px-4 py-2 hover:bg-[var(--tertiary-bg)] shadow-sm transition-colors text-foreground">Return to Search</button>
      </div>
    );
  }

  const currentStatus = normaliseStatus(grievanceData.status);
  const currentStatusTone = statusTone(grievanceData.status);

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="animate-fade-in md:grid-cols-[2fr_1fr] font-sans text-foreground">
      
      {/* LEFT COLUMN: PIPELINE */}
      <div>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          <button onClick={() => router.push('/status')} style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid var(--separator-color)', backgroundColor: 'var(--system-bg)', borderRadius: '6px', color: 'var(--label-primary)', cursor: 'pointer' }} className="hover:bg-[var(--tertiary-bg)] transition-colors">
            ← Back
          </button>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginTop: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 600, color: 'var(--label-primary)', letterSpacing: '-0.02em' }}>Report Progress</h1>
            <span style={{ 
              color: currentStatusTone,
              fontSize: '0.875rem', 
              fontWeight: 600,
              backgroundColor: 'rgba(31, 108, 159, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              textTransform: 'capitalize'
            }}>
              {currentStatus}
            </span>
          </div>
          
          <p style={{ margin: 0, fontSize: '1rem', color: 'var(--label-secondary)' }}>
            Reference Number: <strong style={{ color: 'var(--label-primary)', fontWeight: 500 }}>#{grievanceData.tracking_id}</strong>
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Continuous Line */}
          <div style={{ 
            position: 'absolute', 
            left: '11px', 
            top: '24px', 
            bottom: resolutionStatus === 'pending_citizen_approval' ? '120px' : '30px', 
            width: '2px', 
            background: 'var(--separator-color)',
          }}></div>

          {/* Node 1: Filed */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-2.5rem', top: '0.25rem', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '2px solid var(--system-blue)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--system-blue)' }}></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--label-primary)', fontWeight: 600 }}>Report Received</h3>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Aug 23, 10:00 AM</span>
              </div>
              <p style={{ margin: 0, color: 'var(--label-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
                Your report has been successfully submitted to the system.
              </p>
            </div>
          </div>

          {/* Node 2: Routing */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-2.5rem', top: '0.25rem', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: '2px solid var(--system-blue)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--system-blue)' }}></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--label-primary)', fontWeight: 600 }}>Assigned to Department</h3>
                <span style={{ color: 'var(--label-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Aug 23, 10:02 AM</span>
              </div>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--label-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
                The report was routed to the appropriate department and a central auditor was notified.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--tertiary-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--separator-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--label-secondary)' }}>Department</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--label-primary)', fontWeight: 500 }}>{grievanceData.assigned_department || 'Routing queue'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--label-secondary)' }}>Oversight</span>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--label-primary)', fontWeight: 500 }}>Central Auditing Bureau</strong>
                </div>
                {grievanceData.urgency_level && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--label-secondary)' }}>Urgency</span>
                    <strong style={{ fontSize: '0.875rem', color: grievanceData.urgency_level === 'High' ? 'var(--system-red)' : 'var(--label-primary)', fontWeight: 500 }}>{grievanceData.urgency_level}</strong>
                  </div>
                )}
                {grievanceData.tags && (
                  (() => {
                    let parsedTags: string[] = [];
                    if (Array.isArray(grievanceData.tags)) {
                      parsedTags = grievanceData.tags;
                    } else if (typeof grievanceData.tags === 'string') {
                      try { parsedTags = JSON.parse(grievanceData.tags); } catch (e) {}
                    }
                    if (parsedTags.length === 0) return null;
                    
                    return (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--label-secondary)' }}>Tags</span>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {parsedTags.map((t, i) => <span key={i} style={{ fontSize: '0.75rem', background: 'var(--separator-color)', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>)}
                        </div>
                      </div>
                    );
                  })()
                )}
                {grievanceData.english_translation && (
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--separator-color)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--label-secondary)', marginBottom: '4px' }}>English Translation</span>
                    <p style={{ fontSize: '0.875rem', color: 'var(--label-primary)', margin: 0, fontStyle: 'italic' }}>{grievanceData.english_translation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Node 3: Resolution - Only show if actually resolved or in progress */}
          {(currentStatus === 'RESOLVED' || currentStatus === 'IN PROGRESS') && (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-2.5rem', top: '0.25rem', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--system-bg)', border: `2px solid var(--system-blue)`, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--system-blue)' }}></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--label-primary)', fontWeight: 600 }}>Resolution Provided</h3>
                  <span style={{ color: 'var(--label-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Pending</span>
                </div>
                
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--separator-color)', paddingLeft: '1rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--label-primary)', fontWeight: 500 }}>Officer Remarks</strong>
                  <p style={{ margin: 0, fontSize: '1rem', color: 'var(--label-secondary)', lineHeight: 1.6 }}>
                    No remarks provided yet.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: REPORT DETAILS */}
      <div>
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '560px', backgroundColor: 'var(--system-bg)', borderRadius: '12px', border: '1px solid var(--separator-color)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--separator-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--tertiary-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--label-primary)', fontWeight: 600 }}>Report Contents</strong>
              </div>
            </div>
            
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--system-bg)' }}>
              
              <div style={{ alignSelf: 'flex-start', maxWidth: '100%' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--label-secondary)', marginBottom: '0.375rem', marginLeft: '0.25rem' }}>Title</span>
                <div style={{ color: 'var(--label-primary)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  {grievanceData.title || 'No Title Provided'}
                </div>
                
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--label-secondary)', marginBottom: '0.375rem', marginLeft: '0.25rem' }}>Original Description</span>
                <div style={{ backgroundColor: 'var(--tertiary-bg)', color: 'var(--label-primary)', padding: '0.875rem 1.125rem', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '0.95rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {grievanceData.description}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
