'use client';
import css from './cartSection.module.scss';
import { CardBlock, Container, MainLink } from '@/components/shared';
import { CartItem } from '@/components/entities';
import { useCart } from '@/utils/hooks';
import { Box, Loader } from 'lucide-react';

export const CartSection = () => {
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } =
    useCart();

  if (loading && items.length === 0) {
    return (
      <div className={css.emptyContainer}>
        <Loader
          color="var(--primary-main)"
          size={36}
          className="rotate360"
        />
        <p>Loading...</p>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className={css.emptyContainer}>
        <p>Cart is empty</p>
        <Box size={36} />
      </div>
    );
  }
  if (!items) {
    <div className={css.emptyContainer}>Error. Cart wasn`t loaded</div>;
  }
  return (
    <section className={css.cart}>
      <Container>
        <div className={css.cartContainer}>
          <h1 className={css.cartTitle}>Cart</h1>
          <div className={css.cartBlock}>
            <CardBlock
              h={true}
              title="Items"
              className={css.cartItemsBlock}
            >
              <ul className={css.cartItems}>
                {/* <AnimatePresence mode="popLayout"> */}
                {items.map((item, i) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    index={i}
                    updateItemQuantity={updateItemQuantity}
                    removeCartItem={removeCartItem}
                  />
                ))}
                {/* </AnimatePresence> */}
              </ul>
            </CardBlock>

            <CardBlock
              h={true}
              title="Total cart:"
            >
              <div className={css.cartOrder}>
                {/* <h3 className={css.cartTotalTitle}>Total</h3> */}
                <div className={css.cartTotal}>
                  Items price:{totalAmount} MDL
                </div>
                <div className={css.cartDelivery}>
                  Delivery <span>free</span>
                </div>
                <p className={css.cartPolicy}>
                  <span className={css.asterisk}>*</span>By purchasing goods
                  from us you agree to the privacy policy
                </p>
                <MainLink
                  version="contain"
                  className={css.cartLink}
                  // className={css.cartLink}
                  to="/checkout"
                >
                  Purchase now
                </MainLink>
              </div>
            </CardBlock>
          </div>
        </div>
      </Container>
    </section>
  );
};
