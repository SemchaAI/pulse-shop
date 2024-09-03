import { Container } from '@/components/shared';
import css from './topBar.module.scss';
import { Bar } from '@/components/entities';
import type { ICategory } from '@/models/searchWithParams';

interface Props {
  categories: ICategory[];
}

export const TopBar = ({ categories }: Props) => {
  return (
    <section className={css.topBar}>
      <Container>
        <div className={css.wrapper}>
          <Bar
            categories={categories.filter(
              (category) => category.products.length > 0
            )}
          />
          {/* <SortingSelect /> */}
        </div>
      </Container>
    </section>
  );
};
