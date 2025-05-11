import { getSession } from 'next-auth/react';

export default function Admin() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Админ-панель</h1>
      <p>Здесь можно смотреть пользователей, заказы и управлять каталогом.</p>
      {/* Далее ваши CRUD-UI */}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session || session.user.role !== 'admin') {
    return { redirect: { destination: '/', permanent: false } };
  }
  return { props: {} };
}
