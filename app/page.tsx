"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      
      <div style={{ padding: '0 3rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>Overview</h1>
        <p style={{ color: 'var(--label-secondary)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
          CPGRAMS Dashboard for tracking and lodging civic grievances.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        
        {/* Quick Action - Massive Card */}
        <div 
          className="bento-card col-span-2 row-span-2 animate-fade-in stagger-1" 
          style={{ 
            background: 'var(--label-primary)', 
            color: 'var(--system-bg)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: 'none'
          }}
          onClick={() => router.push('/lodge')}
        >
          <span style={{ backgroundColor: 'var(--label-secondary)', color: 'var(--system-bg)', padding: '6px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem' }}>
            Instant Action
          </span>
          <h2 style={{ fontSize: '3rem', margin: 0, color: 'var(--system-bg)' }}>
            Lodge a Grievance
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--system-bg)', marginTop: '0.5rem', maxWidth: '90%', opacity: 0.8 }}>
            Use your voice or natural language. AI will parse and route it instantly.
          </p>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--system-bg)' }}>→</span>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="bento-card animate-fade-in stagger-2" style={{ borderRadius: '24px', border: '1px solid var(--separator-color)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Resolution Rate
          </h3>
          <div style={{ fontSize: '3.5rem', fontWeight: 700, marginTop: 'auto' }}>
            89<span style={{ fontSize: '1.5rem' }}>%</span>
          </div>
          <p style={{ margin: 0, color: 'var(--system-green)', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.5rem' }}>
            ↑ 2.4% from last month
          </p>
        </div>

        {/* Pending Actions */}
        <div className="bento-card animate-fade-in stagger-3" style={{ cursor: 'pointer', borderRadius: '24px', border: '1px solid var(--separator-color)' }} onClick={() => router.push('/status')}>
          <h3 style={{ fontSize: '1rem', color: 'var(--label-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Action Required
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--system-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>
              1
            </div>
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block' }}>Resolution Proposed</strong>
              <span style={{ color: 'var(--label-secondary)', fontSize: '0.9rem' }}>Awaiting your approval</span>
            </div>
          </div>
        </div>

        {/* Recent Updates Ticker */}
        <div className="bento-card col-span-2 row-span-1 animate-fade-in stagger-4" style={{ justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Civic Updates</h3>
            <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--tertiary-bg)', padding: '4px 8px', borderRadius: '8px', color: 'var(--system-blue)', fontWeight: 600 }}>LIVE</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--system-blue)' }}></div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--label-primary)' }}>Automated APIs deployed.</p>
              <span style={{ marginLeft: 'auto', color: 'var(--label-tertiary)', fontSize: '0.85rem' }}>2h ago</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--separator-color)' }}></div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--label-secondary)' }}>New privacy guidelines.</p>
              <span style={{ marginLeft: 'auto', color: 'var(--label-tertiary)', fontSize: '0.85rem' }}>1d ago</span>
            </div>
          </div>
        </div>

        {/* About CPGRAMS Rules - Full Width Card */}
        <div className="bento-card col-span-3 animate-fade-in stagger-4" style={{ marginTop: '2rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--label-primary)' }}>ABOUT CPGRAMS</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--label-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online platform available to the citizens 24x7 to lodge their grievances to the public authorities on any subject related to service delivery. It is a single portal connected to all the Ministries/Departments of Government of India and States.
          </p>
          <div style={{ backgroundColor: 'var(--tertiary-bg)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--system-blue)' }}>
            <strong style={{ display: 'block', color: 'var(--system-blue)', marginBottom: '0.75rem', fontSize: '1rem' }}>ℹ️ Issues which are not taken up for redress:</strong>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--label-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>RTI Matters</li>
              <li>Court related / Subjudice matters</li>
              <li>Religious matters</li>
              <li>Grievances of Government employees concerning their service matters including disciplinary proceedings etc.</li>
            </ul>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <strong style={{ fontSize: '0.95rem', color: 'var(--label-primary)' }}>Note:</strong>
            <ol style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: 'var(--label-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>If you have not got a satisfactory redress of your grievance within a reasonable period of time, you may seek help of DPG in resolution.</li>
              <li>Government is not charging fee from the public for filing grievances. All money being paid by the public for filing grievance is going only to M/s CSC only.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
}
