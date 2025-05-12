import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cart';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const { items, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setOpen(true);
    document.addEventListener('open-cart', h);
    return () => document.removeEventListener('open-cart', h);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="fixed inset-0 z-50">
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4 overflow-auto">
        <header className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-xl font-semibold">Корзина</Dialog.Title>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          items.map((p) => (
            <div key={p.id} className="flex justify-between mb-2">
              <span>{p.name} × {p.qty}</span>
              <button onClick={() => remove(p.id)} className="text-red-500">&times;</button>
            </div>
          ))
        )}

        <div className="mt-4 flex justify-between">
          <Button onClick={clear}>Очистить</Button>
        </div>
      </div>
    </Dialog>
  );
}
