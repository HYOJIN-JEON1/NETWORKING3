import { prisma } from '@/lib/prisma';
import ProfileCard from '@/components/ProfileCard';
import CoffeeChatModal from '@/components/CoffeeChatModal';

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { portfolio: true },
  });
  if (!user) return <div>존재하지 않는 사용자입니다.</div>;
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <ProfileCard user={user} showDetail />
      <div className="mt-6">
        <h3 className="font-bold mb-2">포트폴리오</h3>
        <ul className="space-y-2">
          {user.portfolio.map((p) => (
            <li key={p.id} className="border rounded p-2">
              <div className="font-semibold">{p.title}</div>
              {p.url && <a href={p.url} className="text-blue-500 underline" target="_blank">{p.url}</a>}
              {p.desc && <div className="text-sm text-gray-600">{p.desc}</div>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <CoffeeChatModal toUserId={user.id} />
      </div>
    </div>
  );
} 