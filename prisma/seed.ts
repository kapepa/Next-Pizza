import bcrypt from 'bcrypt';
import { Cart, Prisma, PrismaClient } from '@prisma/client'
import { categoriesList, ingredientsList, productsList } from './constants';

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function main() {
  await prisma.user.deleteMany();

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      name: 'Alice',
      role: "USER",
      email: 'alice@prisma.io',
      verified: true,
      password: bcrypt.hashSync("123456", 10),
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      name: 'Bob',
      role: "ADMIN",
      email: 'bob@prisma.io',
      verified: true,
      password: bcrypt.hashSync("123456", 10),
    },
  })

  await prisma.category.deleteMany();
  await prisma.category.createMany({ data: categoriesList })
  const categories = await prisma.category.findMany()

  await prisma.ingredient.deleteMany();
  await prisma.ingredient.createMany({
    data: ingredientsList
  }).catch(err => console.log)
  const ingredients = await prisma.ingredient.findMany();

  await prisma.product.deleteMany();
  const createProducts = productsList.map(product => {
    return prisma.product.create({
      data: {
        name: product.name,
        imageUrl: product.imageUrl,
        category: {
          connect: { id: categories[getRandomInt(0, categories.length - 1)].id }, // Connect to an existing category
        },
        // ingredients: {
        //   connect: ((random) => {
        //     const ingredientsAppend = Array(random).fill(null);
        //     const selectId = ingredientsAppend.reduce((accum: Array<string>, _) => {
        //       const getRandomIndex = getRandomInt(0, ingredients.length - 1);
        //       const getIngredient = ingredients[getRandomIndex].id;
        //       if (accum.includes(getIngredient)) return accum;
        //       accum.push(getIngredient);
        //       return accum;
        //     }, [])
        //     return selectId.map((id: string) => ({ id }))
        //   })(getRandomInt(1, ingredients.length))
        // }
      },
    });
  });

  await Promise.all(createProducts);

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: categories[0].id,
      ingredients: {
        connect: ingredients.slice(0, 5).map((ingredient) => ({ id: ingredient.id })),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: categories[0].id,
      ingredients: {
        connect: ingredients.slice(5, 10).map((ingredient) => ({ id: ingredient.id })),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: categories[0].id,
      ingredients: {
        connect: ingredients.slice(10, 40).map((ingredient) => ({ id: ingredient.id })),
      },
    },
  });

  const products = await prisma.product.findMany({
    include: {
      category: true,
    }
  });

  // console.log({ alice, bob, categories: categories.length, ingredients, products: products.length })

  await prisma.productItem.deleteMany();
  const createProductItem = [
    // Пицца "Пепперони фреш"
    { productId: pizza1.id, pizzaType: 1, size: 20, price: getRandomInt(190, 600) },
    { productId: pizza1.id, pizzaType: 2, size: 30, price: getRandomInt(190, 600), },
    { productId: pizza1.id, pizzaType: 2, size: 40, price: getRandomInt(190, 600), },

    // Пицца "Сырная"
    { productId: pizza2.id, pizzaType: 1, size: 20, price: getRandomInt(190, 600), },
    { productId: pizza2.id, pizzaType: 1, size: 30, price: getRandomInt(190, 600), },
    { productId: pizza2.id, pizzaType: 1, size: 40, price: getRandomInt(190, 600), },
    { productId: pizza2.id, pizzaType: 2, size: 20, price: getRandomInt(190, 600), },
    { productId: pizza2.id, pizzaType: 2, size: 30, price: getRandomInt(190, 600), },
    { productId: pizza2.id, pizzaType: 2, size: 40, price: getRandomInt(190, 600), },

    // Пицца "Чоризо фреш"
    { productId: pizza3.id, pizzaType: 1, size: 20, price: getRandomInt(190, 600), },
    { productId: pizza3.id, pizzaType: 2, size: 30, price: getRandomInt(190, 600), },
    { productId: pizza3.id, pizzaType: 2, size: 40, price: getRandomInt(190, 600), },

    // Остальные продукты
    { productId: products[0].id, price: getRandomInt(190, 600) },
    { productId: products[1].id, price: getRandomInt(190, 600) },
    { productId: products[2].id, price: getRandomInt(190, 600) },
    { productId: products[3].id, price: getRandomInt(190, 600) },
    { productId: products[4].id, price: getRandomInt(190, 600) },
    { productId: products[5].id, price: getRandomInt(190, 600) },
    { productId: products[6].id, price: getRandomInt(190, 600) },
    { productId: products[7].id, price: getRandomInt(190, 600) },
    { productId: products[8].id, price: getRandomInt(190, 600) },
    { productId: products[9].id, price: getRandomInt(190, 600) },
    { productId: products[10].id, price: getRandomInt(190, 600) },
    { productId: products[11].id, price: getRandomInt(190, 600) },
    { productId: products[12].id, price: getRandomInt(190, 600) },
    { productId: products[13].id, price: getRandomInt(190, 600) },
    { productId: products[14].id, price: getRandomInt(190, 600) },
    { productId: products[15].id, price: getRandomInt(190, 600) },
    { productId: products[16].id, price: getRandomInt(190, 600) },
  ]
  const productItemList = await Promise.all(createProductItem.map((product) => {
    return prisma.productItem.create({
      data: {
        size: product.size,
        price: product.price,
        pizzaType: product.pizzaType,
        product: {
          connect: { id: product.productId }
        }
      }
    })
  }));

  await prisma.cart.deleteMany();

  const createCarts: Pick<Cart, "userId" | "token">[] = [
    { userId: alice.id, token: alice.id },
    { userId: bob.id, token: bob.id },
  ];
  const createCartsList = await Promise.all(
    createCarts.map((cart) => {
      return prisma.cart.create({
        data: cart,
      })
    })
  )

  await prisma.cartItem.create({
    data: {
      cartId: createCartsList[0].id,
      quantity: 2,
      ingredients: {
        connect: ingredients.slice(0, 3).map(ingredient => ({ id: ingredient.id }))
      },
      productItemId: productItemList[0].id,
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })