import Link from 'next/link';
import { Activity } from 'lucide-react';

import { HeaderAdaptive, Search } from '@/components/features';

import css from './mainHeader.module.scss';
import { Container } from '@/components/shared';

export const MainHeader = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <Link
            className={css.logoLink}
            href="/"
          >
            <Activity
              width={45}
              height={45}
              className={css.logoIcon}
            />
            <div className={css.logoTextBlock}>
              <h1 className={css.logoTitle}>
                <span>Pulse</span>Shop
              </h1>
              <p className={css.logoText}>
                <span>Fastest</span> <span>delivery</span>
              </p>
            </div>
          </Link>
          <Search />
          <HeaderAdaptive />
        </div>
      </Container>
    </header>
  );
};
