import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";

interface ChooseProductFormProps {
  name: string,
  imageUrl: string,
  className?: string,
  onClickAdd: VoidFunction,
}

const ChooseProductForm: FC<ChooseProductFormProps> = (props) => {
  const { name, imageUrl, className, onClickAdd } = props;
  const totalPrice = 350;
  const textDetails = "30 sm, Traditional 30";

  return (
    <div
      className={cn(
        "flex flex-1",
        className,
      )}
    >
      <div
        className="flex items-center justify-center flex-1 relative w-full"
      >
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
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

export { ChooseProductForm }