"use client"

import { CheckoutSidebat } from "@/components/shared/checkout-sidebat";
import { Title } from "@/components/shared/title";
import { useCart } from "@/hooks/use-cart";
import { ClickCountButtonProps } from "@/types-or-int/common";
import { FormProvider, useForm } from "react-hook-form";
import { NextPage } from "next";
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants/checkout-form-schema";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/actions/actions";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getMe } from "@/services/auth";

const CheckoutPage: NextPage = () => {
  const { items, loading, totalAmount, removeCartItem, updateCartItemQuantity } = useCart();
  const { data } = useSession();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getMe();

      form.setValue("firstName", data.name);
      form.setValue("email", data.email);
    }

    if (!!data) fetchUserInfo();
  }, [data, form])

  const onClickCountButton = ({ id, quantity, type }: ClickCountButtonProps) => {
    let quantityChange = quantity;
    if (type === "minus") --quantityChange;
    if (type === "plus") ++quantityChange;
    updateCartItemQuantity({ id, quantity: quantityChange });
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    setSubmitting(true)
    try {
      const url = await createOrder(data);
      toast({ title: "The order was successfull registration" })
      if (!!url) location.href = url;
    } catch (error) {
      console.error(error)
      toast({ title: "Failed to create an order" })
    } finally {
      setSubmitting(false)
    }
  };

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

              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
              <CheckoutAddressForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />

            </div>

            <div
              className="w-[450px]"
            >
              <CheckoutSidebat
                loading={loading && items.length > 0 ? false : loading}
                submitting={submitting}
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