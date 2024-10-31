"use client"

import { ProductWithRelation } from "@/@types/product";
import { useToast } from "@/hooks/use-toast";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface ProductFormProps {
  product: ProductWithRelation,
}

const ProductForm: FC<ProductFormProps> = (props) => {
  const { product } = props;
  const { toast } = useToast()
  const router = useRouter();
  const { loading, addCartItem } = useCartStore();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);

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

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        name={product.name}
        items={product.items}
        loading={loading}
        imageUrl={product.imageUrl}
        ingredients={product.ingredients}
        onSubmit={onSubmit}
      />
    )
  }

  return (
    <ChooseProductForm
      name={product.name}
      price={firstItem.price}
      loading={loading}
      imageUrl={product.imageUrl}
      onSubmit={onSubmit.bind(null, { productItemId: firstItem.id })}
    />
  )
}

export { ProductForm }