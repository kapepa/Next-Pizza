"use client"

import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { FC } from "react";

interface IngredientItemProps {
  name: string,
  price: number,
  active?: boolean,
  imageUrl: string,
  onClick?: () => void,
  className?: string,
}

const IngredientItem: FC<IngredientItemProps> = (props) => {
  const { name, price, active, imageUrl, onClick, className } = props;

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center flex-col rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white",
        { "border border-primary": active },
        className,
      )}
    >
      {
        active && <CircleCheck className="absolute top-2 right-2 text-primary" />
      }
      <img
        src={imageUrl}
        width={110}
        height={110}
        alt={name}
      />
      <span
        className="text-xs mb-1"
      >
        {name}
      </span>
      <span
        className="font-bold"
      >
        {price}
      </span>
    </div>
  )
}

export { IngredientItem }