"use client"

import { CheckoutSidebat } from "@/components/shared/checkout-sidebat";
import { Title } from "@/components/shared/title";
import { useCart } from "@/hooks/use-cart";
import { ClickCountButtonProps } from "@/types/common";
import { FormProvider, useForm } from "react-hook-form";
import { NextPage } from "next";
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/components/shared/constants/checkout-form-schema";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";

const CheckoutPage: NextPage = () => {
  const { items, loading, totalAmount, removeCartItem, updateCartItemQuantity } = useCart();

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      connemt: "",
      lastName: "",
      firstName: "",
    }
  });

  const onClickCountButton = ({ id, quantity, type }: ClickCountButtonProps) => {
    let quantityChange = quantity;
    if (type === "minus") --quantityChange;
    if (type === "plus") ++quantityChange;
    updateCartItemQuantity({ id, quantity: quantityChange });
  }

  const onSubmit = (data: CheckoutFormValues) => console.log(data);

  return (
    <div
      className="mt-10"
    >
      <Title
        size="xl"
        text="Placing an order"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className="flex gap-10"
          >
            <div
              className="grid grid-cols gap-10 flex-1 mb-20"
            >
              <CheckoutCart
                items={items}
                loading={loading}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
              />

              <CheckoutPersonalForm />
              <CheckoutAddressForm />

            </div>

            <div
              className="w-[450px]"
            >
              <CheckoutSidebat
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CheckoutPage;