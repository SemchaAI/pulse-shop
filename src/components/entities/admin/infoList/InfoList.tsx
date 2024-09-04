import css from './infoList.module.scss';
import { InfoCard } from '@/components/entities';

interface IProps {
  list: {
    name: string;
    _count: {
      products: number;
    };
  }[];
}

export const InfoList = async ({ list }: IProps) => {
  return (
    <div className={css.categoriesInfoList}>
      {list.map((item) => (
        <InfoCard
          key={item.name}
          name={item.name}
          count={item._count.products}
        />
      ))}
    </div>
  );
};
