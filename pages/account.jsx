import { useSession, signOut } from 'next-auth/react';

export default function Account() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <p>Загрузка…</p>;
  if (!session) return <p>Пожалуйста, войдите</p>;

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl">Привет, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <p>Роль: {session.user.role}</p>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Выйти
      </button>
    </div>
  );
}
