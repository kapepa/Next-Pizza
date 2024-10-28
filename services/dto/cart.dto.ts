import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDto = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDto extends Cart {
  cartItem: CartItemDto[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}