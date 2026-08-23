"use client";

import { useRouter } from "next/navigation";

export default function ContactUs() {
  const router = useRouter();

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => router.push('/')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          ← Back to Home
        </button>
      </div>

      <div className="text-center mb-12">
        <h1 style={{ color: 'var(--accent-primary)', fontSize: '2.5rem' }}>Contact & Support</h1>
        <p>We are here to assist you with the grievance redressal process.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div className="glass-card text-center" style={{ padding: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
          <h3>Helpline</h3>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Available 24x7 for assistance in all regional languages.</p>
          <a href="tel:1800114000" className="btn-primary" style={{ width: '100%', display: 'block' }}>
            1800-11-4000
          </a>
        </div>

        <div className="glass-card text-center" style={{ padding: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
          <h3>Email Support</h3>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>For technical issues related to the portal.</p>
          <a href="mailto:support@jansunwai.gov.in" className="btn-secondary" style={{ width: '100%', display: 'block' }}>
            support@jansunwai.gov.in
          </a>
        </div>

      </div>

      <div className="glass-card mt-8" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nodal Agency Address</h2>
        <address style={{ fontStyle: 'normal', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <strong>Department of Administrative Reforms and Public Grievances</strong><br/>
          5th Floor, Sardar Patel Bhavan,<br/>
          Parliament Street, New Delhi - 110001<br/>
          India
        </address>
      </div>

    </div>
  );
}
