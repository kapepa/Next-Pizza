"use server"

import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import prisma from "@/db";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
  try {

    await prisma.order.create({
      data: {
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        fullName: `${data.firstName} ${data.lastName}`,
        totalAmount: 500,
        status: OrderStatus.PENDING,
        items: [],
      }
    })
  } catch (error) {
    console.error(error)
  }
}