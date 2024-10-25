import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductItem } from "@prisma/client";

interface getAvailablePizzaSizesProps {
  type: PizzaType,
  items: ProductItem[],
}

const getAvailablePizzaSizes = ({ type, items }: getAvailablePizzaSizesProps): Variant[] => {
  const alailablePIzzaTypes = items.filter((item) => item.pizzaType === type);
  const alailablePIzzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !alailablePIzzaTypes.some((pizza) => Number(pizza.size) === Number(item.value))
  }));

  return alailablePIzzaSizes;
}

export { getAvailablePizzaSizes }