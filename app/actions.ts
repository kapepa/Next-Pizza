"use server"

import { PayOrder } from "@/components/shared/email-template/pay-order";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import prisma from "@/db";
import { SendEmail } from "@/lib/send-email";
import { instance } from "@/services/instance";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("cartToken")?.value;

    if (!token) throw new Error("Cart token not found");

    const userCart = await prisma.cart.findFirst({
      where: {
        token
      },
      include: {
        user: true,
        cartItem: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              }
            }
          }
        }
      }
    })

    if (!userCart) throw new Error("Cart not found");
    if (userCart.totalAmount === 0) throw new Error("Cart is empty");

    const order = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
        token,
      }
    });

    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0,
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      }
    })

    const paymentUrl = `${location.href}?paid` // need to set up a cashier's off

    // this use in checkout
    await instance.post("/api/checkout/callback", { data: { id: order.id } })

    await SendEmail({
      to: data.email,
      subject: `Pay for the order #${order.id}`,
      react: PayOrder({ orderId: order.id, paymentUrl, totalAmount: order.totalAmount })
    })

  } catch (error) {
    console.error(error)
  }
}