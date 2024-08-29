'use client';
import Link from 'next/link';

import css from './cartSection.module.scss';
import { Container } from '@/components/shared';
import { CartItem } from '@/components/entities';
import { useCart } from '@/utils/hooks';

export const CartSection = () => {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  if (items.length === 0) {
    return <div className={css.emptyCart}>Cart is empty</div>;
  }
  if (!items) {
    <div className={css.cartError}>Error. Cart wasn`t loaded</div>;
  }
  return (
    <section className={css.cart}>
      <Container>
        <div className={css.cartContainer}>
          <h1 className={css.cartTitle}>Cart</h1>
          <div className={css.cartBlock}>
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
            <div className={css.cartOrder}>
              <h3 className={css.cartTotalTitle}>Total</h3>
              <div className={css.cartTotal}>{totalAmount} MDL</div>
              <div className={css.cartDelivery}>
                Delivery <span>free</span>
              </div>
              <p className={css.cartPolicy}>
                <span className={css.asterisk}>*</span>By purchasing goods from
                us you agree to the privacy policy
              </p>
              <Link
                className={css.cartLink}
                href="/checkout"
              >
                Purchase now (temporal to home)
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
