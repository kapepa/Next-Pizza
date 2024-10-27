import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza"
import { Ingredient } from "@prisma/client"

interface ItemDetailsProps {
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[],
}

const getCartItemDetails = ({ pizzaType, pizzaSize, ingredients }: ItemDetailsProps): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map(ingredient => ingredient.name));
  }

  return details.join(", ");
}

export { getCartItemDetails }