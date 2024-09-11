import type { IProductInfo } from '@/models/product';
import type { ProductInfo as ProductInfoType } from '@prisma/client';
import type { EmblaOptionsType } from 'embla-carousel';

import { EmblaCarousel } from '@/components/entities';
import { ProductControls, VariantSwitcher } from '@/components/features';

import css from './productInfo.module.scss';
import { notFound } from 'next/navigation';

interface IProps extends IProductInfo {
  gallery: string[];
}

export const ProductInfo = ({ product, productItem, gallery }: IProps) => {
  const infoGuard = product.productInfo && product.productInfo.length > 0;
  const OPTIONS: EmblaOptionsType = {};

  if (productItem === undefined) return notFound();

  return (
    <div className={css.productContainer}>
      <div className={css.productMain}>
        <div className={css.productMedia}>
          <EmblaCarousel
            slides={gallery}
            options={OPTIONS}
          />
        </div>
        <div className={css.productColumn}>
          <h1 className={css.productTitle}>{productItem.title}</h1>
          <p className={css.productDescription}>{product.description}</p>
          <div className={css.productInfo}>
            {/* <ProductRate
              mediumRate={product.rating.mediumRate}
              rates={product.rating.rates}
            /> */}
            <p className={css.productPrice}>
              <span className={css.productInfoLabel}>Price:</span>
              {productItem.price}
              <span>MDL</span>
            </p>
            <p className={css.productCount}>
              <span className={css.productInfoLabel}>In stock:</span>
              {productItem.cnt}
              <span>pcs.</span>
            </p>
            <VariantSwitcher
              product={product}
              productItem={productItem}
            />
          </div>
          <div className={css.productControlsContainer}>
            <ProductControls item={productItem} />
            {/* <ProductControls product={product} /> */}
          </div>
        </div>
      </div>
      {infoGuard ? (
        <div className={css.productSecond}>
          <h2 className={css.productCharTitle}>Characteristics</h2>
          <div className={css.productCharacteristics}>
            {product.productInfo.map((information: ProductInfoType) => (
              <div
                key={information.id}
                className={css.productCharacteristic}
              >
                <h2 className={css.productInfoTitle}>{information.title}</h2>
                <p className={css.productInfoText}>{information.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={css.productCharTitle}>No characteristics</div>
      )}
      {/* <SendRate productId={product._id} />
      <RateList /> */}
    </div>
  );
};
