import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
};

export default function DirectorySearch({ value, onChange, onSearch }: Props) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="이름, 회사, 키워드 등 검색"
        style={{ width: 240, marginRight: 8 }}
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
} 