import { prisma } from '@/lib/prisma';
import ProfileCard from '@/components/ProfileCard';
import FilterBar from '@/components/FilterBar';

export default async function MembersPage({ searchParams }: { searchParams: any }) {
  // 필터링 파라미터 추출
  const { name, tech, interest, kdtClass } = searchParams || {};
  let where: any = {};
  if (name) where.name = { contains: name };
  if (tech) where.techStacks = { has: tech };
  if (interest) where.interests = { has: interest };
  if (kdtClass) where.kdtClass = kdtClass;
  const members = await prisma.user.findMany({ where });
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">멤버 둘러보기</h2>
      <FilterBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {members.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
} 