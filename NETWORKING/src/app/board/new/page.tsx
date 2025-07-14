"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BoardNewPage() {
  const [form, setForm] = useState({
    type: "프로젝트",
    title: "",
    content: "",
    fields: "",
    techStacks: "",
    dueDate: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/board", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        fields: form.fields.split(",").map((s) => s.trim()),
        techStacks: form.techStacks.split(",").map((s) => s.trim()),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      setError("작성 실패");
      return;
    }
    router.push("/board");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">모집글 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="type" value={form.type} onChange={handleChange} className="input w-full">
          <option value="프로젝트">프로젝트</option>
          <option value="스터디">스터디</option>
        </select>
        <input name="title" placeholder="제목" value={form.title} onChange={handleChange} className="input w-full" required />
        <textarea name="content" placeholder="상세 내용 (마크다운 지원)" value={form.content} onChange={handleChange} className="input w-full" rows={6} required />
        <input name="fields" placeholder="모집 분야 (쉼표로 구분)" value={form.fields} onChange={handleChange} className="input w-full" />
        <input name="techStacks" placeholder="예상 기술스택 (쉼표로 구분)" value={form.techStacks} onChange={handleChange} className="input w-full" />
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="input w-full" required />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn w-full">작성하기</button>
      </form>
    </div>
  );
} 