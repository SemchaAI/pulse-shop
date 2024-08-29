'use client';
import { Container } from '@/components/shared';
import css from './favoriteSection.module.scss';
import { useFavorite } from '@/utils/hooks';

interface IProps {
  className?: string;
}

export const FavoriteSection = ({ className }: IProps) => {
  const { items, removeFavoriteItem } = useFavorite();

  const container = `${className}`;
  return (
    <section className={container}>
      <Container>
        <h2>Favorite</h2>
        <div>
          {items.map((item) => (
            <div key={item.id}> {item.title}</div>
          ))}
        </div>
      </Container>
    </section>
  );
};
