import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calcItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,

      addItem(item) {
        const { items } = get();
        const existing = items.find((i) => i.productId === item.productId);

        let updatedItems: CartItem[];
        if (existing) {
          const newQty = Math.min(
            existing.quantity + 1,
            item.maxQuantity ?? 99
          );
          updatedItems = items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: newQty } : i
          );
        } else {
          updatedItems = [...items, { ...item, quantity: 1 }];
        }

        set({
          items: updatedItems,
          itemCount: calcItemCount(updatedItems),
          subtotal: calcSubtotal(updatedItems),
        });
      },

      removeItem(productId) {
        const updatedItems = get().items.filter(
          (i) => i.productId !== productId
        );
        set({
          items: updatedItems,
          itemCount: calcItemCount(updatedItems),
          subtotal: calcSubtotal(updatedItems),
        });
      },

      updateQuantity(productId, quantity) {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const updatedItems = get().items.map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.min(quantity, i.maxQuantity ?? 99) }
            : i
        );
        set({
          items: updatedItems,
          itemCount: calcItemCount(updatedItems),
          subtotal: calcSubtotal(updatedItems),
        });
      },

      clearCart() {
        set({ items: [], itemCount: 0, subtotal: 0 });
      },
    }),
    {
      name: "mqm-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
