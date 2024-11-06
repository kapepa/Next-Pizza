import { CartItemDto } from "@/services/dto/cart.dto";
import { FC } from "react";

interface OrderSuccessProps {
  items: CartItemDto[]
  orderId: string,
}

const OrderSuccess: FC<OrderSuccessProps> = (props) => {
  const { items, orderId } = props;

  return (
    <div>
      <h1>
        Thank you for buying
      </h1>
      <p>
        {`Your order ${orderId} has been paid for`}
      </p>

      <ul>
        {
          items.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
            >
              {item.productItem.product?.name} | {item.productItem.price} x {item.quantity} = {" "}
              {item.productItem.price * item.quantity}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export { OrderSuccess }