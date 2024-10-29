import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest) {
  try {
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

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    if (!token) token = crypto.randomUUID();

    const data = (await req.json()) as CreateCartItemValues;
    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        ingredients: {
          every: {
            id: { in: data.ingredients }
          }
        },
        productItemId: data.productItemId,
      }
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: ++findCartItem.quantity,
        }
      })

      const updateUserCart = await updateCartTotalAmount(token);
      const res = NextResponse.json(updateUserCart, { status: 200 })

      res.cookies.set("cartToken", token);
      return res;
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        quantity: 1,
        ingredients: {
          connect: data.ingredients?.map(id => ({ id }))
        },
        productItemId: data.productItemId
      }
    });

    const updateUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updateUserCart, { status: 200 })
  } catch (error) {
    console.error("Error when creating or adding an item to cart", error)
    return NextResponse.json({ error: "Error when creating or adding an item to cart" }, { status: 500 })
  }
}