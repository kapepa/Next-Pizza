"use client"

import { FC, PropsWithChildren } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib/get-cart-item-details";

interface CartDrawerProps {
  className?: string,
}

const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = (props) => {
  const { children, className } = props;

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
            There are <span className="font-bold">3 items</span> in the cart.
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div
          className="-mx-6 mt-5 overflow-auto flex-1"
        >
          {
            Array(13).fill(null).map((item, index) => (
              <div
                key={`item-${index}`}
                className="mb-2"
              >
                <CartDrawerItem
                  id="1"
                  name={"Name"}
                  price={0}
                  details={getCartItemDetails({ pizzaType: 2, pizzaSize: 30, ingredients: [] })}
                  imageUrl={"https://media.dodostatic.net/image/r:292x292/11EEFB595A197C24BA932A0AD1144AFB.jpg"}
                  quantity={0}
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
                500
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