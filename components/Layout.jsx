import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import CartDrawer from './CartDrawer';

export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <nav className="bg-green-500 text-white p-4 flex justify-between">
        <Link href="/">Цветочница Анюта</Link>
        <div>
          {!session ? (
            <>
              <Link href="/auth/login" className="mr-4">Войти</Link>
              <Link href="/auth/register">Регистрация</Link>
            </>
          ) : (
            <>
              <Link href="/account" className="mr-4">Профиль</Link>
              {session.user.role === 'admin' && (
                <Link href="/admin" className="mr-4">Админка</Link>
              )}
              <button onClick={() => signOut({ callbackUrl: '/' })}>
                Выйти
              </button>
            </>
          )}
        </div>
      </nav>
      <main className="container mx-auto py-8">{children}</main>
      <CartDrawer />
    </>
  );
}
