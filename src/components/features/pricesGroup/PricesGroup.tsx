'use client';
import { Input, RangeSlider } from '@/components/shared';
import { type ReturnFilterProps } from '@/utils/hooks';
import { useState, type ChangeEvent } from 'react';

import css from './pricesGroup.module.scss';
import { useDebounce } from 'react-use';

interface IProps {
  filters: ReturnFilterProps;
  min: number;
  max: number;
  step: number;
}

export const PricesGroup = ({ filters, min, max, step }: IProps) => {
  const priceIds = ['priceFrom', 'priceTo'];
  // let range = [filters.prices.priceFrom || min, filters.prices.priceTo || max];
  const [range, setRange] = useState([
    filters.prices.priceFrom || min,
    filters.prices.priceTo || max,
  ]);
  const [flag, setFlag] = useState(false);

  //helper for range slider
  const updatePrices = (prices: number[]) => {
    if (prices[0] < min || prices[1] > max) {
      setRange([min, max]);
      return;
    }
    setRange(prices);
  };
  useDebounce(
    () => {
      if (range[0] > range[1] || range[1] < range[0]) {
        setRange([min, max]);
        return;
      }
      if (flag) {
        filters.updatePrice('priceFrom', range[0]);
        filters.updatePrice('priceTo', range[1]);
      } else {
        setFlag(true);
      }
    },
    500,
    [range]
  );

  // const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const current = Number(e.target.value);
  //   if (e.target.id === priceIds[0]) {
  //     if (current < min) {
  //       filters.updatePrice('priceFrom', min);
  //     } else filters.updatePrice('priceFrom', current);

  //     return;
  //   }
  //   if (e.target.id === priceIds[1]) {
  //     if (current > max) {
  //       filters.updatePrice('priceTo', max);
  //     } else filters.updatePrice('priceTo', current);
  //     // console.log('current', current);
  //     return;
  //   }
  // };

  return (
    <div className={css.container}>
      <p className={css.title}>Price range:</p>
      <div className={css.inputWrapper}>
        <Input
          id={priceIds[0]}
          type="number"
          placeholder="0"
          min={min}
          max={max - 100}
          step={step}
          value={String(range[0])}
          onChange={(e) => updatePrices([Number(e.target.value), range[1]])}
          onBlur={
            (e: ChangeEvent<HTMLInputElement>) =>
              updatePrices([Number(e.target.value), range[1]])
            // filters.updatePrice('priceFrom', Number(e.target.value))
          }
        />
        <Input
          id={priceIds[1]}
          type="number"
          min={min + 100}
          max={max}
          step={step}
          placeholder="10000"
          value={String(range[1])}
          onChange={(e) => updatePrices([range[0], Number(e.target.value)])}
          onBlur={(e) =>
            //    filters.updatePrice('priceTo', Number(e.target.value))
            updatePrices([range[0], Number(e.target.value)])
          }
        />
      </div>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        //> range[1] ? min : range[0]
        minValue={range[0]}
        //> max ? max : range[1]
        maxValue={range[1]}
        onChange={updatePrices}
      />
    </div>
  );
};
