import { FC, ReactNode, useCallback } from "react"
import { WhiteBlock } from "./white-block"
import { CheckoutItemDetails } from "./checkout-item-details"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

interface CheckoutSidebatProps {
  loading: boolean,
  totalAmount: number,
}

const VAT = 15;
const DELIVERY_PRICE = 250;

const CheckoutSidebat: FC<CheckoutSidebatProps> = (props) => {
  const { loading, totalAmount } = props;

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  const loadingSkeleton = useCallback((val: string | undefined) => {
    if (!val || loading) return <Skeleton className="h-6 w-16 rounded-[6px]" />
    return val;
  }, [loading])

  return (
    <WhiteBlock
      className="p-6 sticky top-4"
    >
      <div
        className="flex flex-col gap-1"
      >
        <span
          className="text-xl"
        >
          Total:
        </span>
        {
          loading
            ? (
              <Skeleton
                className="w-48 h-11"
              />
            )
            : (
              <span
                className="text-[34px] font-extrabold h-11"
              >
                {totalPrice}
              </span>
            )
        }

      </div>
      <CheckoutItemDetails
        title={
          <div
            className="flex items-center"
          >
            <Package
              size={18}
              className="mr-2 text-gray-400"
            />
            Cost of goods:
          </div>
        }
        value={loadingSkeleton(totalAmount.toString())}
      />
      <CheckoutItemDetails
        title={
          <div
            className="flex items-center"
          >
            <Percent
              size={18}
              className="mr-2 text-gray-400"
            />
            Tax:
          </div>
        }
        value={loadingSkeleton(vatPrice.toString())}
      />
      <CheckoutItemDetails
        title={
          <div
            className="flex items-center"
          >
            <Truck
              size={18}
              className="mr-2 text-gray-400"
            />
            Delivery:
          </div>
        }
        value={loadingSkeleton(DELIVERY_PRICE.toString())}
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Go to payment
        <ArrowRight
          className="w-5 ml-2"
        />
      </Button>
    </WhiteBlock>
  )
}

export { CheckoutSidebat }