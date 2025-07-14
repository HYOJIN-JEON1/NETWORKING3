import React from 'react';

type Opportunity = {
  id: string;
  category: string;
  title: string;
  company?: string;
  date?: string;
};

type Props = {
  opportunities: Opportunity[];
  onView: (id: string) => void;
  onWrite: () => void;
};

export default function OpportunityBoard({ opportunities, onView, onWrite }: Props) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {opportunities.map(o => (
          <li key={o.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', cursor: 'pointer' }} onClick={() => onView(o.id)}>
            <b>[{o.category}]</b> {o.title} {o.company && `- ${o.company}`} {o.date && `(${o.date})`}
          </li>
        ))}
      </ul>
    </div>
  );
} 