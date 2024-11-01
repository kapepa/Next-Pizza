import { CheckoutItemDetails } from "@/components/shared/checkout-item-details";
import { Title } from "@/components/shared/title";
import { WhiteBlock } from "@/components/shared/white-block";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Package, Percent, Truck } from "lucide-react";
import { NextPage } from "next";

const CheckoutPage: NextPage = () => {
  return (
    <div
      className="mt-10"
    >
      <Title
        size="xl"
        text="Placing an order"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div
        className="flex gap-40"
      >
        <div
          className="grid grid-cols gap-10 flex-1 mb-20"
        >
          <WhiteBlock
            title="1. Cart"
          >
            123456
          </WhiteBlock>

          <WhiteBlock
            title="2. Personal data"
          >
            <div
              className="grid grid-cols-2 gap-5"
            >
              <Input
                name="firstName"
                type="text"
                className="text-base"
                placeholder="Name"
              />
              <Input
                name="lastName"
                type="text"
                className="text-base"
                placeholder="Last name"
              />
              <Input
                name="email"
                type="email"
                className="text-base"
                placeholder="E-mail"
              />
              <Input
                name="phone"
                type="text"
                className="text-base"
                placeholder="Phone number"
              />
            </div>
          </WhiteBlock>

          <WhiteBlock
            title="3. Address to delivery"
          >
            <div
              className="flex flex-col gap-5"
            >
              <Input
                name="address"
                type="text"
                className="text-base"
                placeholder="Your address"
              />
              <Textarea
                rows={5}
                name="comment"
                className="text-base"
                placeholder="Comment to order"
              />
            </div>
          </WhiteBlock>
        </div>

        <div
          className="w-[450px]"
        >
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
              <span
                className="text-[34px] font-extrabold"
              >
                350
              </span>
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
                  Cost of price:
                </div>
              }
              value="3000"
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
              value="3000"
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
              value="3000"
            />
          </WhiteBlock>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;