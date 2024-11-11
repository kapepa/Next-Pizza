"use client"

import { FC, PropsWithChildren } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { ClickCountButtonProps } from "@/types/common";
import Image from "next/image";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

interface CartDrawerProps {
  className?: string,
}

const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = (props) => {
  const { children } = props;
  const { items, loading, totalAmount, removeCartItem, updateCartItemQuantity } = useCart()

  const onClickCountButton = ({ id, quantity, type }: ClickCountButtonProps) => {
    let quantityChange = quantity;
    if (type === "minus") --quantityChange;
    if (type === "plus") ++quantityChange;
    updateCartItemQuantity({ id, quantity: quantityChange });
  }

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
        <div
          className={cn(
            "flex flex-col h-full",
            !totalAmount && "justify-center",
          )}
        >
          {
            totalAmount > 0 && (
              <SheetHeader>
                <SheetTitle>
                  There are <span className="font-bold">{items.length} items</span> in the cart.
                </SheetTitle>
                <SheetDescription />
              </SheetHeader>
            )
          }
          {
            !totalAmount && (
              <div
                className="flex flex-col items-center justify-center w-72 mx-auto"
              >
                <Image
                  src="/images/empty-box.png"
                  alt="Empty box"
                  width={120}
                  height={120}
                />
                <Title
                  size="sm"
                  text="Cart is empty"
                  className="text-center font-bold my-2"
                />
                <p
                  className="text-center text-neutral-500 mb-5"
                >
                  Add at least one goods, place an order
                </p>
                <SheetClose>
                  <Button
                    size="lg"
                    className="w-56 h-12 text-base"
                  >
                    <ArrowLeft
                      className="w-5 mr-2"
                    />
                    Go back
                  </Button>
                </SheetClose>
              </div>
            )
          }
          {
            totalAmount > 0 && (
              <>
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
                          loading={loading}
                          details={getCartItemDetails(
                            {
                              pizzaType: Number(item.pizzaType) as PizzaType,
                              pizzaSize: Number(item.pizzaSize) as PizzaSize,
                              ingredients: item.ingredients
                            }
                          )
                          }
                          imageUrl={item.imageUrl}
                          quantity={item.quantity}
                          onClickRemove={removeCartItem}
                          onClickCountButton={onClickCountButton}
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
                      href="/checkout"
                    >
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
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
              </>
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { CartDrawer }