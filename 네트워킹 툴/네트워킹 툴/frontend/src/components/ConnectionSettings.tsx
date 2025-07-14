import React from 'react';

type Setting = {
  key: string;
  label: string;
  description: string;
  value: boolean;
};

type Props = {
  settings: Setting[];
  onToggle: (key: string) => void;
};

export default function ConnectionSettings({ settings, onToggle }: Props) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, margin: '16px 0' }}>
      <h4>연결 설정</h4>
      {settings.map(s => (
        <div key={s.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ flex: 1 }}>
            <input
              type="checkbox"
              checked={s.value}
              onChange={() => onToggle(s.key)}
              style={{ marginRight: 8 }}
            />
            {s.label}
            {s.description && (
              <span style={{ marginLeft: 8, cursor: 'pointer' }} title={s.description}>❓</span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
} 