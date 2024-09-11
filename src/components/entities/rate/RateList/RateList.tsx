'use client';
import css from './rateList.module.scss';

import { useEffect, useState } from 'react';
import qs from 'qs';
import toast from 'react-hot-toast';

import { api } from '@/services/api/baseApi';

import { Pagination } from '@/components/features';
import { RateCard } from '../RateCard/RateCard';

import type { Rating } from '@prisma/client';

interface IProps {
  productId: string;
}

export const RateList = ({ productId }: IProps) => {
  const [rates, setRates] = useState<Rating[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [params, setParams] = useState({
    productId: productId,
    page: 1,
  });

  const query = qs.stringify(params, {
    arrayFormat: 'comma',
  });

  useEffect(() => {
    const getRates = async () => {
      try {
        const { rates, totalPages } = await api.rate.getAll(query);
        setRates(rates);
        //console.log('totalPages', totalPages);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
        toast.error('Rates loading error');
      }
    };
    getRates();
  }, [query]);

  const pageHandler = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setParams({ ...params, page });
    }
  };

  if (rates && rates.length > 0) {
    return (
      <div className={css.rateListContainer}>
        <h3 className={css.rateTitle}>Reviews</h3>
        <ul className={css.rateList}>
          {rates.map((rate: Rating) => (
            <li
              key={rate.id}
              className={css.rateItem}
            >
              <RateCard {...rate} />
            </li>
          ))}
        </ul>
        <Pagination
          totalPages={totalPages}
          currentPage={params.page}
          pageHandler={pageHandler}
        />
      </div>
    );
  }
  return <div className={css.zeroProducts}>No reviews</div>;
};
