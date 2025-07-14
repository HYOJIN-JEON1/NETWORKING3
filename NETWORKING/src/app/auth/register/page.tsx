"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", kdtClass: "", github: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "회원가입 실패");
      return;
    }
    router.push("/auth/signin");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="이름" value={form.name} onChange={handleChange} className="input w-full" required />
        <input name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} className="input w-full" required />
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} className="input w-full" required />
        <input name="kdtClass" placeholder="KDT 기수 (예: 3기)" value={form.kdtClass} onChange={handleChange} className="input w-full" required />
        <input name="github" placeholder="GitHub 주소" value={form.github} onChange={handleChange} className="input w-full" required />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn w-full">가입하기</button>
      </form>
    </div>
  );
} 