'use client';
import css from './infoCard.module.scss';
import { Copy } from 'lucide-react';

interface IProps {
  name: string;
  count: number;
}

export const InfoCard = ({ name, count }: IProps) => {
  return (
    <div className={css.category}>
      <div className={css.count}>{count}</div>
      <h3>{name}</h3>
      <Copy
        size={16}
        className={css.copyIcon}
        onClick={() => navigator.clipboard.writeText(name)}
      />
    </div>
  );
};
