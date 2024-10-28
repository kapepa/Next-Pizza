"use client"

import { FC, PropsWithChildren, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { useCartStore } from "@/store/cart";
import { PizzaSize, PizzaType } from "@/constants/pizza";

interface CartDrawerProps {
  className?: string,
}

const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = (props) => {
  const { children, className } = props;
  const { items, totalAmount, fetchCartItems } = useCartStore();

  useEffect(() => {
    fetchCartItems()
  }, [])

  return (
    <Sheet>
      <SheetTrigger
        asChild
      >
        {children}
      </SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]"
      >
        <SheetHeader>
          <SheetTitle>
            There are <span className="font-bold">{items.length} items</span> in the cart.
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div
          className="-mx-6 mt-5 overflow-auto flex-1"
        >
          {
            items.map((item, index) => (
              <div
                key={`item-${item.id}-${index}`}
                className="mb-2"
              >
                <CartDrawerItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  details={
                    (item.pizzaType && item.pizzaSize)
                      ? getCartItemDetails({
                        pizzaType: Number(item.pizzaType) as PizzaType,
                        pizzaSize: Number(item.pizzaSize) as PizzaSize,
                        ingredients: item.ingredients
                      })
                      : ""
                  }
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                />
              </div>
            ))
          }
        </div>

        <SheetFooter
          className="-mx-6 bg-white p-8"
        >
          <div
            className="w-full"
          >
            <div
              className="flex mb-4"
            >
              <span
                className="flex flex-1 text-lg text-neutral-500"
              >
                Total:
                <div
                  className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
                />
              </span>
              <span
                className="font-bold text-lg"
              >
                {totalAmount}
              </span>
            </div>
            <Link
              href="/cart"
            >
              <Button
                type="submit"
                className="w-full h-12 text-base"
              >
                Place an order
                <ArrowRight
                  className="w-5 ml-2"
                />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { CartDrawer }