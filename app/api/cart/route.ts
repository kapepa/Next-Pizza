import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const user = await prisma.user.findUnique({ where: { id: "fb55c1c3-c188-40b1-b700-f1386de3799d" } });
    const token = req.cookies.get("cartToken")?.value;

    if (!token) return NextResponse.json({ items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          { userId: token },
          { token }
        ]
      },
      include: {
        cartItem: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              }
            },
            ingredients: true,
          }
        }
      }
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.error("Error fetching items for cart:", error);
    return NextResponse.json({ error: "Failed to fetch items for cart" }, { status: 500 });
  }
}