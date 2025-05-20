import { create } from "zustand";

interface OrderArchiveItem {
  name: string;
}

interface OrderArchiveState {
  items: OrderArchiveItem[];
  addItem: (item: OrderArchiveItem) => void;
  removeItem: (name: string) => void;
}

const useOrderArchiveStore = create<OrderArchiveState>((set) => ({
  items: [],
  addItem: (item: OrderArchiveItem) =>
    set((state: OrderArchiveState) => ({
      items: [...state.items, item],
    })),
  removeItem: (name: string) =>
    set((state: OrderArchiveState) => ({
      items: state.items.filter((item) => item.name !== name),
    })),
}));

export default useOrderArchiveStore;
