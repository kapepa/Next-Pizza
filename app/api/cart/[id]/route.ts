import prisma from "@/db";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const { quantity } = (await req.json()) as { quantity: number };

    const token = req.cookies.get("cartToken")?.value;
    if (!token) return NextResponse.json({ error: "Cart tocken not found" }, { status: 404 });

    const cartItem = await prisma.cartItem.findFirst({
      where: { id }
    });

    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 });

    await prisma.cartItem.update({
      where: {
        id
      },
      data: {
        quantity: quantity
      }
    })

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) return NextResponse.json({ error: "Cart tocken not found" }, { status: 404 });

    const cartItem = await prisma.cartItem.findUnique({ where: { id } });
    if (!cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 500 });

    await prisma.cartItem.delete({ where: { id } });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart, { status: 200 });
  } catch (error) {
    console.error("Error delete items from cart:", error);
    return NextResponse.json({ error: "Error delete items from cart" }, { status: 500 });
  }
}