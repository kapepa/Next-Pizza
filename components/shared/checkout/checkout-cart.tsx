import { FC } from "react";
import { WhiteBlock } from "../white-block";
import { CartStateItem } from "@/lib/get-cart-details";
import { CheckoutItem } from "../checkout-item";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getCartItemDetails } from "@/lib/get-cart-item-details";
import { ClickCountButtonProps } from "@/types-or-int/common";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface CheckoutCartProps {
  items: CartStateItem[],
  loading: boolean,
  className?: string,
  removeCartItem: (id: string) => void,
  onClickCountButton: (props: ClickCountButtonProps) => void
}

const CheckoutCart: FC<CheckoutCartProps> = (props) => {
  const { items, loading, className, removeCartItem, onClickCountButton } = props;

  return (
    <WhiteBlock
      title="1. Cart"
      className={className}
    >
      <div
        className="flex flex-col gap-5"
      >
        {
          loading && !(items.length > 0)
            ? (
              Array(4).fill(null).map((_, index) => (
                <CheckoutItemSkeleton
                  key={`checkout-item-skeleton-${index}`}
                />
              ))
            )
            : (
              items.map((item, index) => (
                <CheckoutItem
                  key={`${item.id}-${index}`}
                  id={item.id}
                  name={item.name}
                  loading={loading}
                  details={getCartItemDetails(
                    {
                      pizzaType: Number(item.pizzaType) as PizzaType,
                      pizzaSize: Number(item.pizzaSize) as PizzaSize,
                      ingredients: item.ingredients
                    }
                  )}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                  onClickRemove={removeCartItem}
                  onClickCountButton={onClickCountButton}
                />
              ))
            )
        }
      </div>
    </WhiteBlock>
  )
}

export { CheckoutCart }