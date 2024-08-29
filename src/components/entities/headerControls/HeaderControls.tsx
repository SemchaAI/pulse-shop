'use client';
// import { useAppSelector } from '@/lib/utils/hooks';
import css from './headerControls.module.scss';

// import MainBtn from '@/components/shared/buttons/MainBtn';
// import { useLogoutMutation } from '@/services/userApi';

// import MainLink from '@/components/shared/links/MainLink';
// import Cart from '@/components/shared/icons/Cart';
// import FavoriteIcon from '@/components/shared/icons/FavoriteIcon';
// import Badge from '../badge/Badge';

import { Heart, ShoppingCart } from 'lucide-react';

import { ChangeTheme, ProfileControls } from '@/components/features';
import { MainLink } from '@/components/shared';

const user = {
  isActivated: false,
  role: 'ADMIN',
};

export const HeaderControls = () => {
  // const { user } = useAppSelector((state) => state.user);
  // const inFavorite = useAppSelector((state) => state.favorite.items.length);
  // const inCart = useAppSelector((state) => state.cart.items.length);

  // const [logout] = useLogoutMutation();

  // const logoutHandler = useCallback(() => {
  //   logout(null);
  //   localStorage.removeItem('isLogout');
  // }, []);

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
