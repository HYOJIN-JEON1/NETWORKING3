import React from 'react';

type Profile = {
  id: string;
  name: string;
  cohort: string;
  company: string;
  position: string;
  tags: string[];
  photoUrl: string;
  available: boolean;
};

type Props = {
  profiles: Profile[];
  onView: (id: string) => void;
  onMessage: (id: string) => void;
};

export default function ProfileGrid({ profiles, onView, onMessage }: Props) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
      {profiles.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, width: 220, background: '#fafbfc' }}>
          <img src={p.photoUrl} alt="프로필" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }} />
          <h4 style={{ margin: '8px 0 4px 0' }}>{p.name} <span style={{ fontSize: 13, color: '#888' }}>({p.cohort})</span></h4>
          <p style={{ margin: '2px 0', fontSize: 14 }}>{p.company} / {p.position}</p>
          <div style={{ margin: '4px 0' }}>
            {p.tags.slice(0, 4).map(tag => <span key={tag} style={{ background: '#e0e0e0', borderRadius: 8, padding: '2px 6px', margin: '0 2px', fontSize: 12 }}>#{tag}</span>)}
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => onView(p.id)} style={{ marginRight: 4 }}>프로필 상세</button>
            <button onClick={() => onMessage(p.id)} disabled={!p.available} style={{ opacity: p.available ? 1 : 0.5 }}>메시지</button>
          </div>
        </div>
      ))}
    </div>
  );
} 