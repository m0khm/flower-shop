// src/components/FlowerShopSite.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, ShoppingCart, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { create } from 'zustand';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key (Vite will replace import.meta.env.VITE_STRIPE_PK)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// Zustand store для корзины
const useCart = create((set) => ({
  items: [],
  add: (plant) =>
    set((state) => {
      const exists = state.items.find((p) => p.id === plant.id);
      if (exists) {
        return {
          items: state.items.map((p) =>
            p.id === plant.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }
      return { items: [...state.items, { ...plant, qty: 1 }] };
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  clear: () => set({ items: [] }),
}));

// Карточка растения
function PlantCard({ plant, index }) {
  const add = useCart((s) => s.add);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="p-0">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-60 object-cover"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle>{plant.name}</CardTitle>
          <p className="text-sm text-gray-600">{plant.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-lg font-semibold text-green-700">
            {plant.price.toLocaleString('ru-RU', {
              style: 'currency',
              currency: 'RUB',
            })}
          </span>
          <Button size="sm" className="gap-2" onClick={() => add(plant)}>
            <ShoppingCart className="w-4 h-4" />
            В корзину
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Выдвижная панель корзины
function CartDrawer({ open, onClose }) {
  const { items, remove, clear } = useCart();
  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

  const handleCheckout = async () => {
    if (!items.length) return;
    const stripe = await stripePromise;
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const { sessionId } = await res.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col"
        >
          <header className="flex justify-between items-center p-4 border-b">
            <h4 className="text-xl font-bold">Корзина</h4>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length ? (
              items.map((p) => (
                <div key={p.id} className="flex gap-4 items-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      {p.qty} ×{' '}
                      {p.price.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                      })}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(p.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Корзина пуста</p>
            )}
          </div>
          <footer className="border-t p-4 space-y-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Итого:</span>
              <span>
                {total.toLocaleString('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                })}
              </span>
            </div>
            <Button
              className="w-full"
              disabled={!items.length}
              onClick={handleCheckout}
            >
              Оплатить через Stripe
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              disabled={!items.length}
              onClick={clear}
            >
              Очистить корзину
            </Button>
          </footer>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// Главный компонент
export default function FlowerShopSite() {
  const [plants, setPlants] = useState([]);
  const cartCount = useCart((s) =>
    s.items.reduce((n, p) => n + p.qty, 0)
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('/plants.json')
      .then((r) => r.json())
      .then(setPlants)
      .catch(() =>
        setPlants([
          {
            id: 1,
            name: 'Монстера Делициоза',
            description:
              'Крупное вечнозелёное растение с выразительными листьями.',
            price: 4500,
            image:
              'https://images.unsplash.com/photo-1556796876-0ef0b4dfe3bd?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 2,
            name: 'Фикус Эластика',
            description:
              'Неприхотливый фикус с глянцевыми листьями – хит продаж.',
            price: 3200,
            image:
              'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 3,
            name: 'Сенполия (фиалка)',
            description: 'Компактная фиалка, цветущая круглый год.',
            price: 950,
            image:
              'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
          },
        ])
      );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex flex-col">
      {/* Навбар */}
      <header className="px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-white/60 shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold text-green-700">
          Цветочница Анюта
        </h1>
        <nav className="flex items-center gap-4">
          <a
            href="https://instagram.com/anyuta_flowers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-transform hover:scale-110"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com/anyuta_flowers"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-transform hover:scale-110"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <button
            className="relative"
            aria-label="Открыть корзину"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingCart className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-green-800 drop-shadow-lg"
        >
          Живые растения — живая любовь
        </motion.h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-700">
          Выберите идеальное растение для дома или офиса и получайте быструю
          доставку по всему городу.
        </p>
        <Button
          size="lg"
          className="mt-8 px-8 py-6 text-lg font-bold animate-bounce"
          onClick={() =>
            document.getElementById('products')?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          Смотреть каталог
        </Button>
      </section>

      {/* Каталог */}
      <main id="products" className="container mx-auto flex-1 px-4 pb-20">
        <h3 className="text-3xl font-bold text-center mb-10">
          Наши растения
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plants.map((p, idx) => (
            <PlantCard key={p.id} plant={p} index={idx} />
          ))}
        </div>
      </main>

      {/* Футер */}
      <footer className="bg-green-700 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Цветочница Анюта. Все права защищены.</p>
        <p className="mt-2">Сделано
