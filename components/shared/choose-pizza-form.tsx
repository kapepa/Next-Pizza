import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { PizzaImage } from "./pizza-image";

interface ChoosePizzaFormProps {
  name: string,
  items?: any[],
  imageUrl: string,
  className?: string,
  ingredient: any[],
  onClickAdd: VoidFunction,
}

const ChoosePizzaForm: FC<ChoosePizzaFormProps> = (props) => {
  const { name, items, imageUrl, className, ingredient, onClickAdd } = props;
  const size = 30;
  const totalPrice = 350;
  const textDetails = "30 sm, Traditional 30";

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
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {totalPrice}
        </Button>
      </div>
    </div>
  )
}

export { ChoosePizzaForm }