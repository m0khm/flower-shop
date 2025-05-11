// pages/account.jsx
import { signOut, getSession } from "next-auth/react";

export default function Account({ session }) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl">Привет, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <p>Роль: {session.user.role}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Выйти
      </button>
    </div>
  );
}

//  ───────── SSR ─────────
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  // если гость — отправляем на страницу входа
  if (!session) {
    return {
      redirect: { destination: "/auth/login", permanent: false },
    };
  }

  return { props: { session } };
}
