import { cn } from "@/lib/utils";
import { FC } from "react";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { ClickCountButtonProps } from "@/types/common";

interface CartDrawerItemProps extends CartItemProps {
  loading: boolean,
  className?: string,
  onClickRemove: (id: string) => void,
  onClickCountButton: (props: ClickCountButtonProps) => void,
}

const CartDrawerItem: FC<CartDrawerItemProps> = (props) => {
  const { id, name, price, details, quantity, imageUrl, className, onClickRemove, onClickCountButton } = props;

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
            loading={loading}
            value={quantity}
            onClick={(val) => { onClickCountButton({ id, quantity, type: val }) }}
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
              onClick={onClickRemove.bind(null, id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartDrawerItem }