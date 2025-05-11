import { getSession, signOut, useSession } from 'next-auth/react';

export default function AccountPage() {
  const { data: session } = useSession();

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

// Эта функция запускается на сервере при каждом запросе
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  // session попадёт в провайдер в _app.jsx
  return {
    props: { session },
  };
}
