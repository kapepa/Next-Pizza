"use client"

import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/hooks/use-ingredients";
import { useFilters } from "@/hooks/use-filters";
import { useQueryFilters } from "@/hooks/use-query-filters";

interface FiltersProps {
  classNames?: string
}

const Filters: FC<FiltersProps> = (props) => {
  const { classNames } = props;
  const { loading, ingredients } = useIngredients();
  const filters = useFilters()
  useQueryFilters(filters)
  const items = ingredients.map((ingredient) => ({ value: ingredient.id, text: ingredient.name }));

  const updatePrices = ([priceFrom, priceTo]: [number, number]) => {
    filters.setPrice("priceFrom", String(priceFrom))
    filters.setPrice("priceTo", String(priceTo))
  }

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
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setPizzaTypes}
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
        selected={filters.sizes}
        onClickCheckbox={filters.setSizes}
      />
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
            value={filters.prices.priceFrom}
            onChange={(e) => filters.setPrice("priceFrom", e.target.value)}
            placeholder="0"
          />
          <Input
            min={100}
            max={1000}
            type="number"
            value={filters.prices.priceTo}
            onChange={(e) => filters.setPrice("priceTo", e.target.value)}
            placeholder="1000"
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => updatePrices([priceFrom, priceTo])}
        />
      </div>
      <CheckboxFiltersGroup
        name="ingredients"
        title="Ingredients"
        items={items}
        limit={6}
        loading={loading || !ingredients.length}
        className="mt-5"
        selected={filters.ingredients}
        defaultItems={items.slice(0, 6)}
        onClickCheckbox={filters.setIngredients}
      />
    </div>
  )
}

export { Filters }