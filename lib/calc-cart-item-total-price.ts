import { CartItemDto } from "@/services/dto/cart.dto";

export const calcCartItemTotalPrice = (cartItem: CartItemDto): number => {
  const ingredientsPrice = cartItem.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + cartItem.productItem.price) * cartItem.quantity;
};