import { cn } from "@/lib/utils";
import { FC } from "react";
import { Title } from "./title";
import { Button } from "../ui/button";

interface ChooseProductFormProps {
  name: string,
  price: number,
  loading: boolean,
  imageUrl: string,
  onSubmit: VoidFunction,
  className?: string,
}

const ChooseProductForm: FC<ChooseProductFormProps> = (props) => {
  const { name, price, loading, imageUrl, className, onSubmit } = props;

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
        <Button
          loading={loading}
          onClick={onSubmit}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {price}
        </Button>
      </div>
    </div>
  )
}

export { ChooseProductForm }