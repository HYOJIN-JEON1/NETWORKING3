import React, { useState } from 'react';
import OpportunityBoard from '../components/OpportunityBoard';
import OpportunityForm from '../components/OpportunityForm';

const mockOpportunities = [
  { id: '1', category: '채용 정보', title: '데이터 엔지니어 채용', company: '핀테크주식회사', date: '2024-07-01' },
  { id: '2', category: '이벤트', title: 'KDT 네트워킹 파티', date: '2024-08-10' }
];

export default function OpportunityBoardPage() {
  const [opps, setOpps] = useState(mockOpportunities);
  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState('채용 정보');

  const handleWrite = () => {
    setShowForm(true);
  };
  const handleSubmit = (data: any) => {
    setOpps([...opps, { id: String(opps.length + 1), category: formCategory, title: data['회사명'] || data['행사명'] || '새 글', company: data['회사명'], date: data['마감일'] || data['일시'] }]);
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>기회 보드</h2>
      <div style={{ marginBottom: 16 }}>
        <select value={formCategory} onChange={e => setFormCategory(e.target.value)}>
          <option>채용 정보</option>
          <option>프로젝트·스터디</option>
          <option>과정 참여 기회</option>
          <option>이벤트</option>
        </select>
        <button onClick={handleWrite} style={{ marginLeft: 8 }}>글쓰기</button>
      </div>
      {showForm && <OpportunityForm category={formCategory} onSubmit={handleSubmit} />}
      <OpportunityBoard opportunities={opps} onView={id => {}} onWrite={handleWrite} />
    </div>
  );
} 