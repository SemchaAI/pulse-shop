'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
export interface Filters {
  memory: Set<string>;
  color: Set<string>;
  prices: PriceProps;
}

export interface ReturnFilterProps extends Filters {
  toggleColor: (id: string) => void;
  toggleMemory: (id: string) => void;
  updatePrice: (name: keyof PriceProps, value: number) => void;
}

export const useFilters = (): ReturnFilterProps => {
  const searchParams = useSearchParams();

  //prices------------------------------------
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    // if (!prices.priceTo || !prices.priceFrom) return;
    if (value < 0) return;
    if (prices.priceTo && name === 'priceFrom' && value > prices.priceTo) {
      return;
    }
    if (prices.priceFrom && name === 'priceTo' && value < prices.priceFrom) {
      return;
    }
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //-------------------------------------------
  const [color, { toggle: toggleColor }] = useSet(
    new Set<string>(
      searchParams.has('colors') ? searchParams.get('colors')?.split(',') : []
    )
  );
  const [memory, { toggle: toggleMemory }] = useSet(
    new Set<string>(
      searchParams.has('memory') ? searchParams.get('memory')?.split(',') : []
    )
  );

  return useMemo(
    () => ({
      prices,
      color,
      memory,
      toggleMemory,
      updatePrice,
      toggleColor,
    }),
    [prices, color, memory]
  );
};
