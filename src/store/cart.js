import { create } from 'zustand';

export const useCart = create((set) => ({
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
