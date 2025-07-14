import { prisma } from '@/lib/prisma';
import BoardCard from '@/components/BoardCard';

export default async function BoardPage({ searchParams }: { searchParams: any }) {
  const { sort = 'latest' } = searchParams || {};
  const orderBy = sort === 'popular' ? { comments: { _count: 'desc' } } : { createdAt: 'desc' };
  const posts = await prisma.post.findMany({
    orderBy,
    take: 20, // 무한스크롤 구현 시 offset/skip 추가
    include: { author: true },
  });
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">프로젝트 & 스터디 모집</h2>
        <a href="/board/new" className="btn">글쓰기</a>
      </div>
      <div className="flex gap-2 mb-4">
        <a href="/board?sort=latest" className="btn btn-sm">최신순</a>
        <a href="/board?sort=popular" className="btn btn-sm">인기순</a>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <BoardCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 