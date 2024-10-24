"use client"

import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";


interface ChoosePizzaFormProps {
  name: string,
  items: ProductItem[],
  imageUrl: string,
  className?: string,
  ingredients: Ingredient[],
  onClickAddCart: VoidFunction,
}

const ChoosePizzaForm: FC<ChoosePizzaFormProps> = (props) => {
  const { name, items, imageUrl, className, ingredients, onClickAddCart } = props;
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((accum, ingredient) => accum + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const textDetails = `${size} sm, ${mapPizzaType[type]} pizza`;

  const alailablePIzzaTypes = items.filter((item) => item.pizzaType === type);
  const alailablePIzzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !alailablePIzzaTypes.some((pizza) => Number(pizza.size) === Number(item.value))
  }));

  useEffect(() => {
    const isAwailableSize = alailablePIzzaSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = alailablePIzzaSizes?.find((item) => !item.disabled);

    if (!isAwailableSize && availableSize) setSize(Number(availableSize.value) as PizzaSize);
  }, [type])

  const handleClickAdd = () => {
    onClickAddCart?.()
    console.log(selectedIngredients)
  }

  return (
    <div
      className={cn(
        "flex flex-1",
        className,
      )}
    >
      <PizzaImage
        size={size}
        imageUrl={imageUrl}
      />
      <div
        className="w-[490px] bg-[#f7f6f5] p-7"
      >
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />
        <p
          className="text-gray-400"
        >
          {textDetails}
        </p>
        <div
          className="flex flex-col gap-4 mt-5"
        >
          <GroupVariants
            items={alailablePIzzaSizes}
            value={String(size)}
            onClick={(val) => setSize(Number(val) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(val) => setType(Number(val) as PizzaType)}
          />
        </div>
        <div
          className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5"
        >
          <div
            className="grid grid-cols-3 gap-3"
          >
            {
              ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={`ingredient-${ingredient.id}-${index}`}
                  name={ingredient.name}
                  price={ingredient.price}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                  imageUrl={ingredient.imageUrl}
                />
              ))
            }
          </div>
        </div>
        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {totalPrice}
        </Button>
      </div>
    </div>
  )
}

export { ChoosePizzaForm }