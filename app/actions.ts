"use server"

import { PayOrder } from "@/components/shared/email-template/pay-order";
import { VerificationUser } from "@/components/shared/email-template/verification-user";
import { FormRegistSchema, FormRegistSchemaData, FormUpdateSchema, FormUpdateSchemaData } from "@/components/shared/modals/auth-modal/forms/schemas";
import { CheckoutFormValues } from "@/constants/checkout-form-schema";
import prisma from "@/db";
import { getUserSession } from "@/lib/get-user-session";
import { SendEmail } from "@/lib/send-email";
import { instance } from "@/services/instance";
import { OrderStatus } from "@prisma/client";
import { hashSync } from "bcrypt";
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

    return paymentUrl;
  } catch (error) {
    console.error(error)
  }
}

export async function updateUserInfo(data: FormUpdateSchemaData) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) throw new Error("Unauthorized user");

    const existUser = await prisma.user.findFirst({
      where: {
        id: currentUser.id
      }
    })
    if (!existUser) throw new Error("User not found");

    const result = FormUpdateSchema.safeParse(data);
    if (!result.success) throw new Error("Invalid data");

    const { name, email, password } = Object.assign(existUser, result.data);

    await prisma.user.update({
      where: {
        id: existUser.id
      },
      data: {
        name,
        email,
        password: !!result.data.password ? hashSync(password, 10) : password,
      }
    })

    return
  } catch (error) {
    console.error(error)
  }
}

export async function registerUser(data: FormRegistSchemaData) {
  try {
    const result = FormRegistSchema.safeParse(data);
    if (!result.success) throw new Error("Invalid fields");

    const { email, password, confirmPassword, ...other } = result.data;
    if (confirmPassword) { }

    const existUser = await prisma.user.findFirst({
      where: { email }
    })

    if (existUser) {
      if (!existUser.verified) throw new Error("Email unconfirmed");
      throw new Error("Email is already in use");
    }

    const createUser = await prisma.user.create({
      data: {
        ...other,
        email,
        password: hashSync(password, 10)
      }
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      }
    })

    await SendEmail({
      to: email,
      subject: "Confirm registration",
      react: VerificationUser({ code }),
    })

  } catch (error) {
    console.error(error)
  }
}