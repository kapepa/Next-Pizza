import { FC } from "react";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Category, Product } from "@prisma/client";

interface CategoryProps extends Category {
  product: Product[]
}

interface TopBarProps {
  className?: string,
  categories: CategoryProps[],
}

const TopBar: FC<TopBarProps> = (props) => {
  const { className, categories } = props;

  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container
        className="flex items-center justify-between"
      >
        <Categories
          categories={categories}
        />
        <SortPopup />
      </Container>
    </div>
  )
}

export { TopBar }