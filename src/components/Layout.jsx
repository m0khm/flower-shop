// src/components/Layout.jsx
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart';
import CartDrawer from './CartDrawer';

export default function Layout({ children }) {
  const count = useCart((s) => s.items.reduce((n, p) => n + p.qty, 0));

  return (
    <>
      <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Цветочница Анюта
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/account" className="hover:underline">
            ЛК
          </Link>
          <Link href="/admin" className="hover:underline">
            Админ
          </Link>

          <button
            onClick={() => document.dispatchEvent(new Event('open-cart'))}
            className="relative"
          >
            <ShoppingCart size={24} />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-[10px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
      <CartDrawer />
    </>
  );
}
