"use client"

import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProductWithRelation } from "@/@types/product";
import { ProductForm } from "../product-form";

interface ChooseProductModalProps {
  product: ProductWithRelation,
  className?: string,
}

const ChooseProductModal: FC<ChooseProductModalProps> = (props) => {
  const { product, className } = props;
  const router = useRouter();

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
          <ProductForm
            product={product}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { ChooseProductModal }