import { getSession, signOut } from 'next-auth/react';

export default function Account({ session }) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl">Привет, {session.user.email}</h1>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Выйти
      </button>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: '/auth/login', permanent: false } };
  }
  return { props: { session } };
}
