import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { addCartItem, getCart, removeCartItem, updateItemQuantity } from "@/services/cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";

import { create } from "zustand";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateCartItemQuantity: (props: { id: string, quantity: number }) => Promise<void>;
  addCartItem: (props: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: false,
  totalAmount: 0,
  async fetchCartItems() {
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
  async updateCartItemQuantity({ id, quantity }) {
    try {
      set({ loading: true, error: false });
      const data = await updateItemQuantity({ id, quantity });
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  async addCartItem(props) {
    try {
      set({ loading: true, error: false });
      const data = await addCartItem(props);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false })
    }
  },
  async removeCartItem(id) {
    try {
      set({ loading: true, error: false });
      const data = await removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false })
    }
  }
}))

export { useCartStore }