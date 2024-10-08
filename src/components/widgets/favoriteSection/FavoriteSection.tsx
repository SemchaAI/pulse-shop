'use client';
import { AnimatePresence } from 'framer-motion';
import { Box, Loader } from 'lucide-react';

import { Container } from '@/components/shared';

import { FavoriteCard, StateContainer } from '@/components/entities';

import { useFavoriteStore } from '@/stores';

import css from './favoriteSection.module.scss';

export const FavoriteSection = () => {
  const { items, removeFavoriteItem, loading } = useFavoriteStore(
    (state) => state
  );
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
        <p>Favorite is empty</p>
        <Box size={36} />
      </StateContainer>
    );
  }
  if (!items) {
    <StateContainer>Error. Favorite wasn`t loaded</StateContainer>;
  }
  return (
    <section className={css.favorite}>
      <Container>
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Favorite</h1>
          <div className={css.favoriteBlock}>
            <AnimatePresence mode="popLayout">
              <ul className={css.favoriteItems}>
                {items.map((item, i) => (
                  <FavoriteCard
                    key={item.id}
                    item={item}
                    removeFavoriteItem={removeFavoriteItem}
                  />
                ))}
              </ul>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};
