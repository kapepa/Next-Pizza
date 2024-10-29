import prisma from "@/db"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          ingredients: true,
          productItem: {
            include: {
              product: true
            }
          }
        },
      },
    },
  });

  if (!userCart) throw new Error("User cart not found");

  const totalAmount = userCart.cartItem.reduce((acc, item) => {
    return acc + calcCartItemTotalPrice(item);
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id
    },
    data: {
      totalAmount,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          ingredients: true,
          productItem: {
            include: {
              product: true
            }
          }
        },
      },
    }
  })
}

export { updateCartTotalAmount }