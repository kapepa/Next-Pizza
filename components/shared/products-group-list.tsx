import { FC } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

interface ProductsGroupListProps {
  title: string,
  products: any[],
  className?: string,
  categoryId: number,
  listClassName?: string,
}

const ProductsGroupList: FC<ProductsGroupListProps> = (props) => {
  const { title, products, className, categoryId, listClassName } = props;

  return (
    <div
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
          products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              id={product.id}
              name={product.name}
              price={product.items[0].price}
              imageUrl={product.imageUrl}
            />
          ))
        }
      </div>
    </div>
  )
}

export { ProductsGroupList }