import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

interface CalcTotalPizzaPriceProps {
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<string>,
}

const calcTotalPizzaPrice = ({ size, type, items, ingredients, selectedIngredients }: CalcTotalPizzaPriceProps) => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((accum, ingredient) => accum + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}

export { calcTotalPizzaPrice }