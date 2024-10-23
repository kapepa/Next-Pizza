import { Ingredient, Product, ProductItem } from "@prisma/client";

export interface ProductWithRelation extends Product {
  items: ProductItem[],
  ingredients: Ingredient[],
}