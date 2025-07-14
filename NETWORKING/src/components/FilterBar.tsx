'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') || '');
  const [tech, setTech] = useState(searchParams.get('tech') || '');
  const [interest, setInterest] = useState(searchParams.get('interest') || '');
  const [kdtClass, setKdtClass] = useState(searchParams.get('kdtClass') || '');

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (tech) params.set('tech', tech);
    if (interest) params.set('interest', interest);
    if (kdtClass) params.set('kdtClass', kdtClass);
    router.push(`/members?${params.toString()}`);
  };

  return (
    <form onSubmit={handleFilter} className="flex flex-wrap gap-2 items-center">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="이름" className="input" />
      <input value={tech} onChange={e => setTech(e.target.value)} placeholder="기술스택" className="input" />
      <input value={interest} onChange={e => setInterest(e.target.value)} placeholder="관심분야" className="input" />
      <input value={kdtClass} onChange={e => setKdtClass(e.target.value)} placeholder="기수" className="input" />
      <button type="submit" className="btn">검색</button>
    </form>
  );
} 