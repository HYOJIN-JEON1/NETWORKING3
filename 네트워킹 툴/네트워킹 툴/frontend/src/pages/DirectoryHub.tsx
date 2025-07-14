import React, { useState } from 'react';
import DirectorySearch from '../components/DirectorySearch';
import DirectoryFilters from '../components/DirectoryFilters';
import ProfileGrid from '../components/ProfileGrid';

const mockProfiles = [
  { id: '1', name: '김핀테크', cohort: '2기', company: '핀테크주식회사', position: '데이터분석가', tags: ['Python', '금융AI', '커리어상담'], photoUrl: 'https://randomuser.me/api/portraits/men/12.jpg', available: true },
  { id: '2', name: '이CEO', cohort: '1기', company: 'CEO Inc', position: '대표', tags: ['블록체인', 'IR자료_피드백'], photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg', available: false }
];

const filterOptions = {
  cohort: ['1기', '2기', '3기'],
  industry: ['IT', '금융', '제조'],
  skills: ['Python', 'SQL', '머신러닝', 'AWS', 'React'],
  help: ['커리어상담', '이력서검토', '사이드프로젝트_조언', 'IR자료_피드백']
};

export default function DirectoryHub() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({ cohort: [], industry: [], skills: [], help: [] });
  const [profiles] = useState(mockProfiles);

  const handleFilterChange = (type: string, value: string) => {
    setFilters(f => ({ ...f, [type]: f[type].includes(value) ? f[type].filter(x => x !== value) : [...f[type], value] }));
  };

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ minWidth: 180 }}>
        <DirectoryFilters {...filterOptions} onChange={handleFilterChange} />
      </div>
      <div style={{ flex: 1 }}>
        <DirectorySearch value={search} onChange={setSearch} onSearch={() => {}} />
        <ProfileGrid profiles={profiles} onView={id => {}} onMessage={id => {}} />
      </div>
    </div>
  );
} 