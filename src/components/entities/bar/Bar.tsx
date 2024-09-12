'use client';
import Link from 'next/link';
import { useCategoryStore } from '@/stores';

import type { Category } from '@prisma/client';
import css from './bar.module.scss';

interface Props {
  categories: Category[];
}

export const Bar = ({ categories }: Props) => {
  const { setActiveId, activeId } = useCategoryStore();

  return (
    <div className={css.bar}>
      {categories.map((category) => (
        <Link
          className={`${css.barItem} ${
            activeId === category.id ? css.active : ''
          }`}
          key={category.id}
          onClick={() => setActiveId(category.id)}
          href={`#${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
