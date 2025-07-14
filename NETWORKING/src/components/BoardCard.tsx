import Link from 'next/link';

export default function BoardCard({ post }: { post: any }) {
  return (
    <div className="border rounded p-4 bg-white flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{post.type}</span>
        <span className="text-xs text-gray-500">{new Date(post.dueDate).toLocaleDateString()} 마감</span>
      </div>
      <div className="font-bold text-lg">
        <Link href={`/board/${post.id}`}>{post.title}</Link>
      </div>
      <div className="text-sm text-gray-600">{post.fields?.join(', ')}</div>
      <div className="flex gap-2 mt-1">
        {post.techStacks?.map((stack: string) => (
          <span key={stack} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{stack}</span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">작성자: {post.author?.name}</span>
        <span className="text-xs text-gray-500">댓글 {post.comments?.length || 0}</span>
      </div>
    </div>
  );
} 