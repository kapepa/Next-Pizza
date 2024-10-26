import { cn } from "@/lib/utils";
import { FC } from "react";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface CartDrawerItemProps extends CartItemProps {
  className?: string,
}

const CartDrawerItem: FC<CartDrawerItemProps> = (props) => {
  const { id, name, price, details, quantity, imageUrl, className } = props;

  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        className,
      )}
    >
      <CartItemDetailsImage
        src={imageUrl}
      />
    </div>
  )
}

export { CartDrawerItem }