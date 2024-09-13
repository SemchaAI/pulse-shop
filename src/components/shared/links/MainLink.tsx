import Link from 'next/link';

import css from './mainLink.module.scss';

export interface ILink {
  to: string;
  label: string;
  mode?: 'link' | 'button';
  version?: 'text' | 'outline' | 'contain';
  children?: React.ReactNode;
  className?: string;
}

export const MainLink = ({
  to,
  children,
  mode = 'link',
  version = 'text',
  className,
  label,
}: ILink) => {
  const classes = `${css.link} ${mode === 'button' ? css.button : ''} ${
    css[version]
  } ${className || ''}`;
  return (
    <Link
      href={to}
      className={classes}
      aria-label={label}
    >
      {children}
    </Link>
  );
};
