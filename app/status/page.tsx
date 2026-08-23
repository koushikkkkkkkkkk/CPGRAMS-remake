"use client";

import { useRouter } from "next/navigation";

export default function StatusHub() {
  const router = useRouter();

  const grievances = [
    {
      id: "JANS-2026-8891X",
      title: "Leaking water pipe near main junction",
      date: "Aug 23, 2026",
      status: "action_taken",
      department: "Water Supply & Sanitation"
    },
    {
      id: "JANS-2026-7732A",
      title: "Potholes on 4th Cross Road",
      date: "Aug 10, 2026",
      status: "solved",
      department: "Public Works Department (PWD)"
    },
    {
      id: "JANS-2026-9910B",
      title: "Streetlights not working in Sector 5",
      date: "Aug 24, 2026",
      status: "no_action",
      department: "Electricity Board"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "solved": return 'var(--system-green)';
      case "action_taken": return 'var(--system-orange)'; // More visible than yellow
      case "no_action": return 'var(--system-red)';
      default: return 'var(--separator-color)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "solved": return 'Solved (Approved)';
      case "action_taken": return 'Action Taken (Needs Review)';
      case "no_action": return 'Received (No Action Yet)';
      default: return '';
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '6rem', maxWidth: '1000px' }}>
      
      <div className="flex flex-col gap-6 mb-12">
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>My Grievances</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Track the status of your lodged complaints and verify resolutions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {grievances.map((g) => {
          const statusColor = getStatusColor(g.status);
          
          return (
            <div 
              key={g.id} 
              className="glass-card" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease', 
                padding: '2rem',
                borderLeft: `6px solid ${statusColor}`,
                boxShadow: `0 4px 20px 0 rgba(0,0,0,0.05), inset 4px 0 20px -10px ${statusColor}`
              }}
              onClick={() => router.push(`/status/${g.id}`)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = statusColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.borderLeftColor = statusColor;
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--label-primary)', letterSpacing: '0.05em' }}>#{g.id}</strong>
                  <span style={{ 
                    color: statusColor, 
                    fontSize: '0.85rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em' 
                  }}>
                    {getStatusText(g.status)}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{g.title}</h3>
                <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                  {g.department} • Filed on {g.date}
                </p>
              </div>
              
              <div style={{ color: 'var(--accent-primary)', fontSize: '2rem', opacity: 0.7 }}>
                →
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
