import css from './saleTag.module.scss';

interface IProps {
  price: number;
  oldPrice: number;
}

export const SaleTag = ({ price, oldPrice }: IProps) => {
  const Percentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  return <div className={css.saleTag}>{Percentage}%</div>;
};
