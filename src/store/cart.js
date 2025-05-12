import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  add: (plant) =>
    set((s) => {
      const idx = s.items.findIndex((p) => p.id === plant.id);
      if (idx > -1) s.items[idx].qty += 1;
      else s.items.push({ ...plant, qty: 1 });
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((p) => p.id !== id) })),
  clear: () => set({ items: [] }),
}));
