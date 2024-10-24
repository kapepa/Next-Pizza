"use client"

import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelation } from "@/@types/product";
import { ChoosePizzaForm } from "../choose-pizza-form";

interface ChooseProductModalProps {
  product: ProductWithRelation,
  className?: string,
}

const ChooseProductModal: FC<ChooseProductModalProps> = (props) => {
  const { product, className } = props;
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog
      open={!!product}
      onOpenChange={() => router.back()}
    >
      <DialogTitle
        className="hidden"
      />
      <DialogDescription
        className="hidden"
      />
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
        )}
      >
        <DialogHeader>
          {
            isPizzaForm
              ? <ChoosePizzaForm
                name={product.name}
                items={product.items}
                imageUrl={product.imageUrl}
                ingredients={product.ingredients}
                onClickAdd={() => { }}
                className=""
              />
              : <ChooseProductForm
                name={product.name}
                imageUrl={product.imageUrl}
                onClickAdd={() => { }}
                className=""
              />
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { ChooseProductModal }