'use client';
import css from './cartSection.module.scss';
import { CardBlock, Container, MainLink } from '@/components/shared';
import { CartItem, StateContainer } from '@/components/entities';
import { useCart } from '@/utils/hooks';
import { Box, Loader } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const CartSection = () => {
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } =
    useCart();

  if (loading && items.length === 0) {
    return (
      <StateContainer>
        <Loader
          color="var(--primary-main)"
          size={36}
          className="rotate360"
        />
        <p>Loading...</p>
      </StateContainer>
    );
  }
  if (items.length === 0) {
    return (
      <StateContainer>
        <p>Cart is empty</p>
        <Box size={36} />
      </StateContainer>
    );
  }
  if (!items) {
    <StateContainer>Error. Cart wasn`t loaded</StateContainer>;
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
              <AnimatePresence mode="popLayout">
                <ul className={css.cartItems}>
                  {items.map((item, i) => (
                    <motion.li
                      layout
                      initial={{ translateX: 0 }}
                      key={item.id}
                      exit={{ opacity: 0, translateX: [0, -2000] }}
                      transition={{ duration: 0.3 }}
                      className={`${css.cartItem} ${
                        item.disabled ? css.disabled : ''
                      }`}
                    >
                      <CartItem
                        item={item}
                        index={i}
                        updateItemQuantity={updateItemQuantity}
                        removeCartItem={removeCartItem}
                      />
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            </CardBlock>

            <CardBlock
              h={true}
              title="Total cart:"
            >
              <div className={css.cartOrder}>
                {/* <h3 className={css.cartTotalTitle}>Total</h3> */}
                <div className={css.cartTotal}>
                  Items price: {totalAmount} MDL
                </div>
                <div className={css.cartDelivery}>
                  Items positions: <span>{items.length}</span>
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
                  label="to checkout page"
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
