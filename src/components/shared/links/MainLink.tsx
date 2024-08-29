import Link from 'next/link';

import css from './mainLink.module.scss';

export interface ILink {
  to: string;
  mode?: 'link' | 'button';
  version?: 'text' | 'outline' | 'contain';
  children?: React.ReactNode;
}

export const MainLink = ({
  to,
  children,
  mode = 'link',
  version = 'text',
}: ILink) => {
  const classes = `${css.link} ${mode === 'button' ? css.button : ''} ${
    css[version]
  }`;
  return (
    <Link
      href={to}
      className={classes}
    >
      {children}
    </Link>
  );
};
