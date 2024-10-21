"use client"

import { cn } from "@/lib/utils";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface FiltersProps {
  classNames?: string
}

interface PriceRangeProps {
  priceTo: number,
  priceFrom: number,
}

interface QueryFilters extends PriceRangeProps {
  sizes?: string,
  pizzaTypes?: string,
  ingredients?: string,
}

const Filters: FC<FiltersProps> = (props) => {
  const { classNames } = props;
  const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const [price, setPrice] = useState<PriceRangeProps>({
    priceTo: Number(searchParams.get("priceTo")) || 1000,
    priceFrom: Number(searchParams.get("priceFrom")) || 0,
  });
  const { onAddId, loading, selectedIngredients, ingredients } = useFilterIngredients(searchParams.get("ingredients")?.split(',') ?? []);
  const items = ingredients.map((ingredient) => ({ value: ingredient.id, text: ingredient.name }));

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get("sizes")?.split(',') ?? []));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(",") ?? []));

  const updatePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const name = target.name as keyof PriceRangeProps;
    const value = target.value;

    setPrice(props => ({ ...props, [name]: Number(value) }));
  }

  useEffect(() => {
    const filters = {
      ...price,
      sizes: Array.from(sizes),
      pizzaTypes: Array.from(pizzaTypes),
      ingredients: Array.from(selectedIngredients),
    }
    const queryString = qs.stringify(filters, { arrayFormat: 'comma' });
    router.push(`?${queryString}`, { scroll: false });
  }, [router, price, sizes, pizzaTypes, selectedIngredients])

  return (
    <div
      className={cn(
        "",
        classNames,
      )}
    >
      <Title
        size="sm"
        text="Filtration"
        className="mb-5 font-bold"
      />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        title="Pizza type"
        loading={false}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
        className="mt-5"
        selected={pizzaTypes}
        onClickCheckbox={togglePizzaTypes}
      />
      <CheckboxFiltersGroup
        name="sizes"
        title="Sizes"
        loading={false}
        items={[
          { text: "20 sm", value: "20" },
          { text: "30 sm", value: "30" },
          { text: "40 sm", value: "40" },
        ]}
        className="mt-5"
        selected={sizes}
        onClickCheckbox={toggleSizes}
      />
      {/* <div
        className="flex flex-col gap-4"
      >
        <FilterCheckbox
          name="collect"
          text="Can collect"
          value="1"
        />
        <FilterCheckbox
          name="New"
          text="Novelties"
          value="2"
        />
      </div> */}
      <div
        className="mt-5 border-y-neutral-100 py-6 pb-7"
      >
        <p
          className="font-bold mb-3"
        >
          Price from to
        </p>
        <div
          className="flex gap-3 mb-5"
        >
          <Input
            min={0}
            max={999}
            type="number"
            name="priceFrom"
            value={price.priceFrom}
            onChange={updatePrice}
            placeholder="0"
          />
          <Input
            min={100}
            max={1000}
            type="number"
            name="priceTo"
            value={price.priceTo}
            onChange={updatePrice}
            placeholder="1000"
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>
      <CheckboxFiltersGroup
        name="ingredients"
        title="Ingredients"
        items={items}
        limit={6}
        loading={loading || !ingredients.length}
        className="mt-5"
        selected={selectedIngredients}
        defaultItems={items.slice(0, 6)}
        onClickCheckbox={onAddId}
      />
    </div>
  )
}

export { Filters }