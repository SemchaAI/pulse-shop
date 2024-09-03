'use client';
import { Container } from '@/components/shared';
import css from './favoriteSection.module.scss';
import { FavoriteCard } from '@/components/entities';
import { Box, Loader } from 'lucide-react';
import { useFavoriteStore } from '@/stores';

export const FavoriteSection = () => {
  const { items, removeFavoriteItem, loading } = useFavoriteStore(
    (state) => state
  );
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
        <p>Favorite is empty</p>
        <Box size={36} />
      </div>
    );
  }

  return (
    <section className={css.favorite}>
      <Container>
        <div className={css.favoriteContainer}>
          <h1 className={css.favoriteTitle}>Favorite</h1>
          <div className={css.favoriteBlock}>
            <ul className={css.favoriteItems}>
              {/* <AnimatePresence mode="popLayout"> */}
              {items.map((item, i) => (
                <FavoriteCard
                  key={item.id}
                  item={item}
                  removeFavoriteItem={removeFavoriteItem}
                />
              ))}
              {/* </AnimatePresence> */}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
