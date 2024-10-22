import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";

interface QueryFilters extends PriceRangeProps {
  sizes?: string,
  pizzaTypes?: string,
  ingredients?: string,
}

interface PriceRangeProps {
  priceTo?: number,
  priceFrom?: number,
}

interface QueryFilters extends PriceRangeProps {
  sizes?: string,
  prices?: PriceRangeProps,
  pizzaTypes?: string,
  ingredients?: string,
}

export interface Filters {
  sizes: Set<string>,
  prices: PriceRangeProps,
  pizzaTypes: Set<string>,
  ingredients: Set<string>,
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceRangeProps, value: string) => void,
  setSizes: (value: string) => void,
  setPizzaTypes: (value: string) => void,
  setIngredients: (value: string) => void,
}

const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get("sizes")?.split(',') ?? []));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(",") ?? []));
  const [ingredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",") ?? []));

  const [prices, setPrices] = useState<PriceRangeProps>({
    priceTo: Number(searchParams.get("priceTo")) || 1000,
    priceFrom: Number(searchParams.get("priceFrom")) || 0,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: string) => {
    setPrices((props: PriceRangeProps) => ({ ...props, [name]: Number(value) }));
  }

  return { prices, sizes, pizzaTypes, ingredients, setPrice: updatePrice, setSizes: toggleSizes, setPizzaTypes: togglePizzaTypes, setIngredients: toggleIngredients };
}

export { useFilters }