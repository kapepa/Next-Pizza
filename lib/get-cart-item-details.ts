import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza"
import { CartStateItem } from "./get-cart-details";

interface ItemDetailsProps {
  pizzaType?: PizzaType | null | undefined,
  pizzaSize?: PizzaSize | null | undefined,
  ingredients: CartStateItem["ingredients"],
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