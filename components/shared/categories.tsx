"use client"

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category, Product } from "@prisma/client";
import { FC } from "react";

interface CategoryProps extends Category {
  product: Product[]
}

interface CategoriesProps {
  className?: string,
  categories: CategoryProps[],
}

const Categories: FC<CategoriesProps> = (props) => {
  const { className, categories } = props;
  const activeId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
        className,
      )}
    >
      {
        categories.map((category, index) => (
          !!category.product.length && <a
            key={`${category}-${index}`}
            href={`#${category.id}`}
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5",
              activeId === category.id && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
          // onClick={() => console.log(category.id)}
          >
            <button>
              {category.name}
            </button>
          </a>
        ))
      }
    </div >
  )
}

export { Categories }