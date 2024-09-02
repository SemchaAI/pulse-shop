import css from './headerControls.module.scss';

import { Heart, ShoppingCart } from 'lucide-react';

import { ChangeTheme, ProfileControls } from '@/components/features';
import { MainLink } from '@/components/shared';

export const HeaderControls = () => {
  return (
    <>
      <div className={css.navButtons}>
        {/* {user.role === 'ADMIN' && (
          <MainLink
            mode="link"
            version="text"
            to={'/admin'}
          >
            Admin
          </MainLink>
        )} */}
        <MainLink
          mode="link"
          version="text"
          to={'/favorite'}
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
