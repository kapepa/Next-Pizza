import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const token = req.cookies.get("cartToken")?.value;
    if (!token) return NextResponse.json({ error: "Cart tocken not found" }, { status: 404 });

    const cartItem = await prisma.cartItem.findFirst({
      where: { id }
    });

    if (cartItem) return NextResponse.json({ error: "Cart item not found" }, { status: 404 })



    return NextResponse.json("");
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}