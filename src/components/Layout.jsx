import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import CartDrawer from './CartDrawer';
import { ShoppingCart } from 'lucide-react';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <nav className="bg-green-500 text-white p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Цветочница Анюта
        </Link>

        <div className="flex items-center space-x-4">
          {/* Кнопка корзины */}
          <button
            className="relative"
            onClick={() => document.dispatchEvent(new Event('open-cart'))}
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {/* суммарное количество в корзине */}
              {useCart.getState().items.reduce((sum, p) => sum + p.qty, 0)}
            </span>
          </button>

          {!session ? (
            <>
              <Link href="/auth/login" className="hover:underline">
                Войти
              </Link>
              <Link href="/auth/register" className="hover:underline">
                Регистрация
              </Link>
            </>
          ) : (
            <>
              <Link href="/account" className="hover:underline">
                Личный кабинет
              </Link>

              {session.user.role === 'admin' && (
                <Link href="/admin" className="hover:underline">
                  Админ-панель
                </Link>
              )}

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hover:underline"
              >
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
