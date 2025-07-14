import React, { useState } from 'react';

type Props = {
  category: string;
  onSubmit: (data: any) => void;
};

export default function OpportunityForm({ category, onSubmit }: Props) {
  const [form, setForm] = useState<any>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 카테고리별 템플릿 필드
  const fields = {
    '채용 정보': ['회사명', '포지션', '주요 업무', '자격 요건', '마감일', '추천인'],
    '이벤트': ['행사명', '일시', '장소', '참가 대상']
    // ... 기타 카테고리
  }[category] || [];

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16 }}>
      <h3>{category} 등록</h3>
      {fields.map(f => (
        <div key={f} style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontWeight: 500 }}>{f}</label>
          <input name={f} onChange={handleChange} style={{ width: '100%' }} />
        </div>
      ))}
      <button type="submit">등록</button>
    </form>
  );
} 