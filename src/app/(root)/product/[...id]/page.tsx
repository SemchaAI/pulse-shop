import { RateList, SendRate } from '@/components/entities';
import { Container } from '@/components/shared';
import { ProductInfo } from '@/components/widgets';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { notFound } from 'next/navigation';

interface IProps {
  params: {
    id: string[];
  };
}

export default async function page({ params: { id } }: IProps) {
  const [productId, productItemId] = id;

  const user = await getUserSession();

  let rating = null;
  if (user) {
    rating = await prisma.rating.findFirst({
      where: {
        userId: Number(user.id),
        productId: Number(productId),
      },
    });
  }
  const isRated = rating ? true : false;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
    include: {
      productItem: {
        include: {
          productImages: true,
        },
      },
      colors: true,
      memory: true,
      ram: true,
      category: true,
      productInfo: true,
    },
  });

  if (!product || !product.productItem[0]) {
    return notFound();
  }

  const [productItem] = product.productItem.filter(
    (item) => item.id === Number(productItemId)
  );

  const gallery =
    productItem && productItem.productImages !== null
      ? [...productItem.productImages.thumbnails, productItem.img]
      : productItem && productItem.img !== undefined
      ? [productItem.img]
      : ['src/to/placeholder.png'];

  return (
    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Container>
        <ProductInfo
          product={product}
          productItem={productItem}
          gallery={gallery}
        />
        <SendRate
          isRated={isRated}
          productId={productId}
          user={user}
        />
        <RateList productId={productId} />
      </Container>
    </div>
  );
}
