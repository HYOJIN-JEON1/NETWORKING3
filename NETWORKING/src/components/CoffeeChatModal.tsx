'use client';
import { useState } from 'react';

export default function CoffeeChatModal({ toUserId }: { toUserId: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/coffeechat', {
      method: 'POST',
      body: JSON.stringify({ toUserId, message }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setStatus('done');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>커피챗 신청하기</button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="font-bold mb-2">커피챗 신청</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="신청 메시지" className="input w-full" required />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn">신청</button>
                <button type="button" className="btn" onClick={() => setOpen(false)}>취소</button>
              </div>
              {status === 'done' && <div className="text-green-500">신청 완료!</div>}
              {status === 'error' && <div className="text-red-500">신청 실패</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
} 