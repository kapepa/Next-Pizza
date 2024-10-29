"use client"

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/lib/calc-total-pizza-price";
import { usePizzaOptions } from "@/hooks/use-pizza-options";

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
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<string>([]));
  const { size, type, setSize, setType, availableSizes } = usePizzaOptions({ items })

  const totalPrice = calcTotalPizzaPrice({
    size, type, items, ingredients, selectedIngredients
  })

  const textDetails = `${size} sm, ${mapPizzaType[type]} pizza`;

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
            items={availableSizes}
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