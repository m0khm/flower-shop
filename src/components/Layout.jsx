// src/components/Layout.jsx
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart';
import CartDrawer from './CartDrawer';

export default function Layout({ children }) {
  const total = useCart((s) =>
    s.items.reduce((sum, p) => sum + p.qty, 0)
  );

  return (
    <>
      <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Цветочница Анюта</a>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/auth/login">
            <a className="hover:underline">ЛК</a>
          </Link>

          <Link href="/admin">
            <a className="hover:underline">Admin</a>
          </Link>

          <button
            onClick={() =>
              document.dispatchEvent(new Event('open-cart'))
            }
            className="relative"
          >
            <ShoppingCart size={24} />
            {total > 0 && (
              <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-[10px] rounded-full flex items-center justify-center">
                {total}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <CartDrawer />
    </>
  );
}
