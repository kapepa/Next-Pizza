import { CartStateItem } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

interface CartProps {
  loading: boolean;
  totalAmount: number;
  items: CartStateItem[];
  updateCartItemQuantity: (props: { id: string, quantity: number }) => Promise<void>;
  removeCartItem: (id: string) => Promise<void>;
}

export const useCart = (): CartProps => {
  const { items, loading, totalAmount, fetchCartItems, removeCartItem, updateCartItemQuantity } = useCartStore();

  useEffect(() => {
    fetchCartItems()
  }, []);

  return { items, loading, totalAmount, removeCartItem, updateCartItemQuantity }
}