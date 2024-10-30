import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSizes } from "@/lib/get-available-pizza-sizes";
import { ProductItem } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PizzaOptionsProps {
  items: ProductItem[],
}

interface ReturnPizzaOption {
  size: PizzaSize,
  type: PizzaType,
  setSize: Dispatch<SetStateAction<PizzaSize>>,
  setType: Dispatch<SetStateAction<PizzaType>>,
  currentItemId: string | undefined,
  availableSizes: Variant[],
}

const usePizzaOptions = ({ items }: PizzaOptionsProps): ReturnPizzaOption => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const availableSizes = getAvailablePizzaSizes({ type, items })
  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAwailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAwailableSize && availableSize) setSize(Number(availableSize.value) as PizzaSize);
  }, [type])

  return { size, type, setSize, setType, currentItemId, availableSizes };
}

export { usePizzaOptions }