"use client"

import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelation } from "@/@types/product";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/store/cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useToast } from "@/hooks/use-toast";

interface ChooseProductModalProps {
  product: ProductWithRelation,
  className?: string,
}

const ChooseProductModal: FC<ChooseProductModalProps> = (props) => {
  const { product, className } = props;
  const router = useRouter();
  const { toast } = useToast()
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const { loading, addCartItem } = useCartStore();

  const onSubmit = async ({ ingredients, productItemId }: CreateCartItemValues) => {
    try {
      await addCartItem({ ingredients, productItemId });
      toast({
        description: `${product.name} was added to your shopping cart`,
      });
    } catch (error) {
      toast({
        description: `Failed to add ${product.name} to cart`,
      })
      console.error(error)
    } finally {
      router.back()
    }
  }

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
                loading={loading}
                imageUrl={product.imageUrl}
                ingredients={product.ingredients}
                onSubmit={onSubmit}
              />
              : <ChooseProductForm
                name={product.name}
                price={firstItem.price}
                loading={loading}
                imageUrl={product.imageUrl}
                onSubmit={onSubmit.bind(null, { productItemId: firstItem.id })}
              />
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { ChooseProductModal }