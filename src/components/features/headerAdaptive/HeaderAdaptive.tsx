'use client';
import { useState } from 'react';
import css from './header.module.scss';

import { AlignJustify, X } from 'lucide-react';
import { HeaderControls } from '@/components/entities';
import { MainLink } from '@/components/shared';
import { useScrollControl } from '@/utils/hooks';

export const HeaderAdaptive = () => {
  const [active, setActive] = useState(false);
  useScrollControl(active);
  const classes = `${css.headerContainer} ${
    active ? `${css.headerContainerActive} fadeIn` : ''
  }`;

  const links = ['smartphones', 'tablets', 'accessories'];

  return (
    <>
      {active && (
        <div
          onClick={() => setActive(!active)}
          className={`${css.mobOverlay} fadeIn`}
        ></div>
      )}
      <div className={classes}>
        {
          <div className={`${active ? css.mobMenuActive : css.mobMenu}`}>
            <div
              onClick={() => setActive(!active)}
              className={css.closeBtn}
            >
              <X
                className={css.closeIcon}
                width={23}
                height={23}
              />
            </div>
            <nav className={css.nav}>
              <ul className={css.navList}>
                {links.map((link) => (
                  <li
                    className={css.navItem}
                    key={link}
                  >
                    <MainLink
                      mode="link"
                      version="text"
                      to={`/admin/${link}`}
                    >
                      {link}
                    </MainLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        }
        <HeaderControls />
      </div>
      {/* <div
        onClick={() => setActive(!active)}
        className={`fadeIn ${css.burgerMenu}`}
      > */}
      <AlignJustify
        onClick={() => setActive(!active)}
        className={`fadeIn ${css.burgerMenu}`}
        width={40}
        height={40}
      />
      {/* </div> */}
    </>
  );
};
