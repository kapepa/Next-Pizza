"use client"

import { FC, useEffect, useRef } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from 'react-use';
import { useCategoryStore } from "@/store/category";
import { Ingredient, Product, ProductItem } from "@prisma/client";

type ProductType = Product & { items: ProductItem[], ingredients: Ingredient[] }

interface ProductsGroupListProps {
  title: string,
  products: ProductType[],
  className?: string,
  categoryId: string,
  listClassName?: string,
}

const ProductsGroupList: FC<ProductsGroupListProps> = (props) => {
  const { title, products, className, categoryId, listClassName } = props;
  const intersectionRef = useRef<HTMLDivElement>(null);
  const { setActiveId } = useCategoryStore();
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  useEffect(() => {
    if (intersection?.isIntersecting) setActiveId(categoryId)
  }, [title, categoryId, setActiveId, intersection?.isIntersecting])

  return (
    <section
      id={categoryId}
      ref={intersectionRef}
      className={className}
    >
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-5"
      />
      <div
        className={cn(
          "grid grid-cols-3 gap-[50px]",
          listClassName,
        )}
      >
        {
          products.map((product, index) => {
            return (
              <ProductCard
                key={`${title}-${product.id}-${index}`}
                id={product.id}
                name={product.name}
                price={product.items[0].price}
                imageUrl={product.imageUrl}
                ingredients={product.ingredients}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export { ProductsGroupList }