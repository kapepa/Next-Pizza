import { OrderSuccess } from "@/components/shared/email-template/order-success";
import prisma from "@/db";
import { SendEmail } from "@/lib/send-email";
import { CartItemDto } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: string }

    const order = await prisma.order.findFirst({
      where: { id }
    })

    if (!order) return NextResponse.json({ error: "Order not found" });

    await prisma.order.update({
      where: { id },
      data: { status: OrderStatus.SUCCEED }
    })

    const items = order.items as unknown as CartItemDto[];

    await SendEmail({
      to: order.email,
      react: OrderSuccess({ items, orderId: order.id }),
      subject: "Next pizza | Your order has been success complited",
    })

  } catch (error) {
    console.error("Error checkout callback:", error);
    return NextResponse.json({ error: "Error checkout callback" }, { status: 500 });
  }
}