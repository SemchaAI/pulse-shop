'use client';
import { Container } from '@/components/shared';
import css from './favoriteSection.module.scss';
import { useFavorite } from '@/utils/hooks';

import { FavoriteCard } from '@/components/entities';

export const FavoriteSection = () => {
  const { items, removeFavoriteItem } = useFavorite();

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
