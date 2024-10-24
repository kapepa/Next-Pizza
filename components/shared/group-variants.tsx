"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

type Variant = {
  name: string,
  value: string,
  disabled?: boolean,
}

interface GroupVariantsProps {
  items: readonly Variant[],
  onClick?: (value: Variant["value"]) => void,
  className?: string,
  value?: Variant["value"],
}

const GroupVariants: FC<GroupVariantsProps> = (props) => {
  const { items, onClick, className, value } = props;

  return (
    <div
      className={cn(
        "flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none",
        className,
      )}
    >
      {
        items.map((item, index) => (
          <button
            key={`item-${item.name}-${index}`}
            className={cn(
              "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-300 text-sm",
              {
                "bg-white shadow": item.value === value,
                "text-gray-500 opacity-50 pointer-events-none": item.disabled,
              }
            )}
            onClick={() => onClick?.(item.value)}
          >
            {item.name}
          </button>
        ))
      }
    </div>
  )
}

export { GroupVariants }