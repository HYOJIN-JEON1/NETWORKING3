import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function CoffeeChatPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <div>로그인 필요</div>;
  const sent = await prisma.coffeeChat.findMany({
    where: { fromId: session.user.id },
    include: { to: true },
    orderBy: { createdAt: 'desc' },
  });
  const received = await prisma.coffeeChat.findMany({
    where: { toId: session.user.id },
    include: { from: true },
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">커피챗 관리</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold mb-2">보낸 요청</h3>
          <ul className="space-y-2">
            {sent.map((chat) => (
              <li key={chat.id} className="border rounded p-2">
                <div>To: {chat.to.name}</div>
                <div>상태: {chat.status}</div>
                <div>메시지: {chat.message}</div>
                {chat.status === '수락됨' && <div>이메일: {chat.to.email}</div>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">받은 요청</h3>
          <ul className="space-y-2">
            {received.map((chat) => (
              <li key={chat.id} className="border rounded p-2">
                <div>From: {chat.from.name}</div>
                <div>상태: {chat.status}</div>
                <div>메시지: {chat.message}</div>
                {chat.status === '수락됨' && <div>이메일: {chat.from.email}</div>}
                {chat.status === '대기중' && (
                  <div className="flex gap-2 mt-2">
                    <form action={`/api/coffeechat/${chat.id}/accept`} method="POST">
                      <button className="btn btn-sm">수락</button>
                    </form>
                    <form action={`/api/coffeechat/${chat.id}/reject`} method="POST">
                      <button className="btn btn-sm">거절</button>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 