import React, { useState } from 'react';

type TagType = 'skill' | 'interest' | 'help';
type TagCardProps = {
  type: TagType;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  suggestions: string[];
};

const typeLabel = {
  skill: '보유 스킬',
  interest: '관심 분야',
  help: '도움을 줄 수 있는 분야'
};

export default function TagCard({ type, tags, onAdd, onRemove, suggestions }: TagCardProps) {
  const [input, setInput] = useState('');
  const filtered = suggestions.filter(s => s.includes(input) && !tags.includes(s));
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, minWidth: 180 }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{typeLabel[type]}</h4>
      <div style={{ marginBottom: 8 }}>
        {tags.map(tag => (
          <span key={tag} style={{ display: 'inline-block', background: '#e0e0e0', borderRadius: 12, padding: '2px 8px', margin: '2px 4px', fontSize: 13 }}>
            #{tag} <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => onRemove(tag)}>x</button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="태그 입력"
        list={`suggestions-${type}`}
        style={{ width: '80%' }}
      />
      <datalist id={`suggestions-${type}`}>
        {filtered.map(s => <option key={s} value={s} />)}
      </datalist>
      <button style={{ marginLeft: 4 }} onClick={() => { if (input) { onAdd(input); setInput(''); } }}>추가</button>
    </div>
  );
} 