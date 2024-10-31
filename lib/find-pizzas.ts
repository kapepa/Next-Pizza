import prisma from "@/db";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
  const ingredientsIdArr = params.ingredients?.split(",").map(String);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      product: {
        include: {
          ingredients: true,
          items: {
            orderBy: {
              price: "asc",
            },
          },
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
              some: {
                id: {
                  in: ingredientsIdArr
                }
              }
            }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
      }
    }
  });

  const pizzaIndex = categories.findIndex(category => category.name === "Pizza")
  const products = categories[pizzaIndex].product.map(product => {
    product.items = product.items.filter(item => item.size && item.pizzaType);
    return product
  });
  const sortProducts = products.sort((a, b) => a.items[0].price - b.items[0].price);
  categories[pizzaIndex].product = sortProducts;

  return categories;
}

export { findPizzas }