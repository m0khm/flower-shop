import { getSession } from 'next-auth/react';

export default function Admin() {
  return <h1 className="text-2xl">Админ-панель (заглушка)</h1>;
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user.role !== 'admin') {
    return { redirect: { destination: '/', permanent: false } };
  }
  return { props: {} };
}
