import css from './headerControls.module.scss';

import { Heart, ShoppingCart } from 'lucide-react';

import { ChangeTheme, ProfileControls } from '@/components/features';
import { MainLink } from '@/components/shared';

export const HeaderControls = () => {
  return (
    <>
      <div className={css.navButtons}>
        <MainLink
          mode="link"
          version="text"
          to={'/favorite'}
          label="to favorite page"
        >
          <div className={css.icon}>
            <Heart className={css.headerIcon} />
            {/* <Badge inBadge={inFavorite} /> */}
          </div>
        </MainLink>
        <MainLink
          mode="link"
          version="text"
          to={'/cart'}
          label="to cart page"
        >
          <div className={css.icon}>
            <ShoppingCart className={css.headerIcon} />
            {/* <Badge inBadge={inCart} /> */}
          </div>
        </MainLink>
        <ChangeTheme />
        <ProfileControls />
      </div>
    </>
  );
};
