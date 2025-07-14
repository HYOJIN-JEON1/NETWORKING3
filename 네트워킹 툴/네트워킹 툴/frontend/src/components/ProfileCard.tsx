import React from 'react';

type Profile = {
  name: string;
  cohort: string;
  company: string;
  position: string;
  bio: string;
  photoUrl: string;
};

export default function ProfileCard({ profile, onEdit }: { profile: Profile; onEdit: () => void }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
      <img src={profile.photoUrl} alt="프로필" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>{profile.name} <span style={{ fontSize: 16, color: '#888' }}>({profile.cohort})</span></h2>
        <p style={{ margin: '4px 0' }}>{profile.company} / {profile.position}</p>
        <p style={{ margin: '4px 0', color: '#555' }}>{profile.bio}</p>
      </div>
      <button onClick={onEdit}>프로필 수정</button>
    </div>
  );
} 