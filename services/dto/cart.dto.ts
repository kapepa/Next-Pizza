import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDto = CartItem & {
  productItem: ProductItem & {
    product: Product | null;
  };
  ingredients: Ingredient[];
};

export interface CartDto extends Cart {
  cartItem: CartItemDto[];
}

export interface CreateCartItemValues {
  productItemId: string;
  ingredients?: string[];
}