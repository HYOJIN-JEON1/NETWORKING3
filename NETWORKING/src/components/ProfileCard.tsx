import Link from 'next/link';

export default function ProfileCard({ user, showDetail = false }: { user: any; showDetail?: boolean }) {
  return (
    <div className="border rounded p-4 flex flex-col items-start bg-white">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
          {user.name[0]}
        </div>
        <div>
          <div className="font-bold text-lg">{user.name} <span className="text-xs text-gray-500">{user.kdtClass}</span></div>
          <div className="text-sm text-gray-600">{user.bio || '한 줄 소개가 없습니다.'}</div>
          <div className="flex gap-2 mt-1">
            {user.techStacks?.slice(0, 2).map((stack: string) => (
              <span key={stack} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{stack}</span>
            ))}
          </div>
        </div>
      </div>
      {showDetail && (
        <div className="mt-4 w-full">
          <div className="text-sm"><b>이메일:</b> {user.email}</div>
          <div className="text-sm"><b>GitHub:</b> <a href={user.github} className="text-blue-500 underline" target="_blank">{user.github}</a></div>
          <div className="text-sm mt-2"><b>관심분야:</b> {user.interests?.join(', ')}</div>
          <div className="text-sm mt-2"><b>기술스택:</b> {user.techStacks?.join(', ')}</div>
        </div>
      )}
      {!showDetail && (
        <Link href={`/profile/${user.id}`} className="mt-4 text-blue-500 underline text-sm">프로필 보기</Link>
      )}
    </div>
  );
} 