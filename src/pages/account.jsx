// src/pages/account.jsx
import { signOut } from 'next-auth/react';

/**
 * SSR-страница «Личный кабинет».
 * session приходит из getServerSideProps.
 */
export default function Account({ session }) {
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

/*  ─────  SSR  ─────  */
export async function getServerSideProps(ctx) {
  const { getSession } = await import('next-auth/react');
  const session = await getSession(ctx);

  // если не авторизован — редиректим на /auth/login
  if (!session) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    };
  }

  return { props: { session } };
}
