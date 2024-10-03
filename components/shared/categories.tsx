"use client"

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { FC } from "react";

const categories: string[] = ["Pizzas", "Combos", "Snacks", "Cocktails", "Coffee", "Drinks", "Desserts"];

interface CategoriesProps {
  className?: string,
}

const Categories: FC<CategoriesProps> = (props) => {
  const { className } = props;
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
        className,
      )}
    >
      {
        categories.map((categorie, index) => (
          <a
            key={`${categorie}-${index}`}
            href={`#${categorie}`}
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5",
              activeId === index && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
          >
            <button>
              {categorie}
            </button>
          </a>
        ))
      }
    </div>
  )
}

export { Categories }