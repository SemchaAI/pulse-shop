import {
  Categories,
  Colors,
  Memory,
  ProductInfo,
  ProductItemsSimple,
  ProductItemsSmartphones,
  ProductItemThumbnails,
  Products,
  RAM,
} from './consts';
import { prisma } from './prisma-client';

async function up() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Test User1',
  //       email: 'roomsmore@gmail.com',
  //       password: hashSync('12345678', 10),
  //       role: 'USER',
  //       verified: new Date(),
  //     },
  //     {
  //       name: 'Test User2',
  //       email: 'semciucnichita@gmail.com',
  //       password: hashSync('12345678', 10),
  //       role: 'USER',
  //       verified: new Date(),
  //     },
  //   ],
  // });
  await prisma.category.createMany({
    data: Categories.map(({ id, ...props }) => props),
  });
  ///-------------------------------
  await prisma.color.createMany({
    data: Colors.map(({ id, ...props }) => props),
  });
  await prisma.memory.createMany({
    data: Memory.map(({ id, ...props }) => props),
  });
  await prisma.ram.createMany({
    data: RAM.map(({ id, ...props }) => props),
  });
  ///-------------------------------

  const products = Products.map(({ id, ...props }) => props);

  for (let i = 0; i < products.length; i++) {
    await prisma.product.create({
      data: {
        ...products[i],
        colors: {
          connect: products[i].colors,
        },
        ram: {
          connect: products[i].ram,
        },
        memory: {
          connect: products[i].memory,
        },
      },
    });
  }

  ///-------------------------------
  await prisma.productInfo.createMany({
    data: ProductInfo,
  });
  // const smartPocoX6 = await prisma.product.create({
  //   data: {
  //     title: 'Poco X6',
  //     description:
  //       'A smartphone that embodies power and style, designed for those who value high technology and quality. With a light weight of just 181g and a slim body measuring 161.2 x 74.3 x 8mm, this smartphone fits easily into your pocket or bag while offering impeccable performance and ease of use.',
  //     totalRating: 0,
  //     img: '8ad1aadf-4590-44b2-b31b-0be38c1c8f5f-kpksgj.webp',
  //     categoryId: 1,
  //   },
  // });

  //
  await prisma.productItem.createMany({
    data: [...ProductItemsSmartphones, ...ProductItemsSimple],
  });
  await prisma.productImages.createMany({
    data: [...ProductItemThumbnails],
  });

  // await prisma.cart.createMany({
  //   data: [
  //     {
  //       userId: 1,
  //       token: 'token1',
  //       totalAmount: 1,
  //     },
  //     {
  //       userId: 2,
  //       token: 'token2',
  //       totalAmount: 1,
  //     },
  //   ],
  // });
  // await prisma.cartProduct.createMany({
  //   data: [
  //     {
  //       cartId: 1,
  //       productItemId: 1,
  //       quantity: 1,
  //     },
  //     {
  //       cartId: 2,
  //       productItemId: 2,
  //       quantity: 2,
  //     },
  //   ],
  // });
}

async function down() {
  // await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Memory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ram" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductInfo" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductImages" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "CartProduct" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
