import React from 'react';

type FilterProps = {
  cohort: string[];
  industry: string[];
  skills: string[];
  help: string[];
  onChange: (type: string, value: string) => void;
};

export default function DirectoryFilters({ cohort, industry, skills, help, onChange }: FilterProps) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <h4>기수</h4>
      {cohort.map(c => (
        <label key={c} style={{ display: 'block' }}><input type="checkbox" onChange={() => onChange('cohort', c)} /> {c}</label>
      ))}
      <h4>산업 분야</h4>
      {industry.map(i => (
        <label key={i} style={{ display: 'block' }}><input type="checkbox" onChange={() => onChange('industry', i)} /> {i}</label>
      ))}
      <h4>보유 스킬</h4>
      {skills.map(s => (
        <label key={s} style={{ display: 'block' }}><input type="checkbox" onChange={() => onChange('skills', s)} /> {s}</label>
      ))}
      <h4>도움 줄 수 있는 분야</h4>
      {help.map(h => (
        <label key={h} style={{ display: 'block' }}><input type="checkbox" onChange={() => onChange('help', h)} /> {h}</label>
      ))}
    </div>
  );
} 