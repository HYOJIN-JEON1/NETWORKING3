import React, { useState } from 'react';

type Request = {
  id: string;
  type: string;
  from: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
};

type Props = {
  received: Request[];
  sent: Request[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

export default function Inbox({ received, sent, onAccept, onReject }: Props) {
  const [tab, setTab] = useState<'received' | 'sent'>('received');
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, margin: '16px 0' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setTab('received')} style={{ fontWeight: tab === 'received' ? 'bold' : 'normal' }}>받은 요청</button>
        <button onClick={() => setTab('sent')} style={{ fontWeight: tab === 'sent' ? 'bold' : 'normal' }}>보낸 요청</button>
      </div>
      <div>
        {tab === 'received' ? (
          received.map(req => (
            <div key={req.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <b>{req.from}</b>: {req.message}
              {req.status === 'pending' && (
                <>
                  <button onClick={() => onAccept(req.id)}>수락</button>
                  <button onClick={() => onReject(req.id)}>거절</button>
                </>
              )}
              {req.status !== 'pending' && <span style={{ color: req.status === 'accepted' ? 'green' : 'red' }}>{req.status === 'accepted' ? '수락됨' : '거절됨'}</span>}
            </div>
          ))
        ) : (
          sent.map(req => (
            <div key={req.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
              <b>{req.type}</b> to {req.from}: {req.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 