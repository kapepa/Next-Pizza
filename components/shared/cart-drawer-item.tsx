import { cn } from "@/lib/utils";
import { FC } from "react";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";

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
      <div
        className="flex-1"
      >
        <CartItemInfo
          name={name}
          details={details}
        />
        <hr
          className="my-3"
        />

        <div
          className="flex items-center justify-between"
        >
          <CountButton
            value={quantity}
            onClick={() => { }}
          />
          <div
            className="flex items-center gap-3"
          >
            <CartItemDetailsPrice
              value={price}
            />
            <Trash2Icon
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartDrawerItem }