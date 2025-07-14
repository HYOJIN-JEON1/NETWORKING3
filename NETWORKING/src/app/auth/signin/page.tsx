"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });
    if (res?.error) {
      setError("로그인 실패");
      return;
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="이메일" value={form.email} onChange={handleChange} className="input w-full" required />
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} className="input w-full" required />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn w-full">로그인</button>
      </form>
    </div>
  );
} 