import { CartItemDto } from "@/services/dto/cart.dto";
import { CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export const calcCartItemTotalPrice = (cartItem: CartItemDto): number => {
  const ingredientsPrice = cartItem.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + cartItem.productItem.price) * cartItem.quantity;
};