import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { getCart } from "@/services/cart";

import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  // updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  // addCartItem: (values: CreateCartItemValues) => Promise<void>;
  // removeCartItem: (id: number) => Promise<void>;
}

const useStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: false,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}))