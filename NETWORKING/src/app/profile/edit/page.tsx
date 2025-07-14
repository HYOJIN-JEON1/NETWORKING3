"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileEditPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", kdtClass: "", email: "", github: "", bio: "", techStacks: "", interests: "", portfolio: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 내 프로필 정보 불러오기
    async function fetchProfile() {
      const res = await fetch(`/api/profile/me`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name || "",
          kdtClass: data.kdtClass || "",
          email: data.email || "",
          github: data.github || "",
          bio: data.bio || "",
          techStacks: (data.techStacks || []).join(", "),
          interests: (data.interests || []).join(", "),
          portfolio: (data.portfolio || []).map((p: any) => `${p.title}:${p.url || ''}:${p.desc || ''}`).join("\n"),
        });
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/profile/me", {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        techStacks: form.techStacks.split(",").map((s) => s.trim()),
        interests: form.interests.split(",").map((s) => s.trim()),
        portfolio: form.portfolio.split("\n").map((line) => {
          const [title, url, desc] = line.split(":");
          return { title, url, desc };
        }),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      setError("수정 실패");
      return;
    }
    router.push(`/profile/${session?.user?.id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="이름" value={form.name} onChange={handleChange} className="input w-full" required />
        <input name="kdtClass" placeholder="KDT 기수" value={form.kdtClass} onChange={handleChange} className="input w-full" required />
        <input name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} className="input w-full" required />
        <input name="github" placeholder="GitHub 주소" value={form.github} onChange={handleChange} className="input w-full" required />
        <input name="bio" placeholder="한 줄 소개" value={form.bio} onChange={handleChange} className="input w-full" />
        <input name="techStacks" placeholder="기술스택 (쉼표로 구분)" value={form.techStacks} onChange={handleChange} className="input w-full" />
        <input name="interests" placeholder="관심분야 (쉼표로 구분)" value={form.interests} onChange={handleChange} className="input w-full" />
        <textarea name="portfolio" placeholder="포트폴리오 (한 줄에 하나씩: 제목:URL:설명)" value={form.portfolio} onChange={handleChange} className="input w-full" rows={4} />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn w-full">수정하기</button>
      </form>
    </div>
  );
} 