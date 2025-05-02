import { create } from "zustand";

interface CartItem {
  name: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (name: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item: CartItem) =>
    set((state: CartState) => ({ items: [...state.items, item] })),
  removeItem: (name: string) =>
    set((state: CartState) => ({
      items: state.items.filter((item) => item.name !== name),
    })),
}));

export default useCartStore;
