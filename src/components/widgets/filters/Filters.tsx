'use client';
import { CheckboxFiltersGroup, PricesGroup } from '@/components/features';

import {
  useFilters,
  useGetFilters,
  useQueryFilters,
  useScrollControl,
} from '@/utils/hooks';

import css from './filters.module.scss';
import { filtersConfig } from '@/utils/consts/FiltersConfig';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { MainBtn } from '@/components/shared';

export const Filters = () => {
  const { colors, memory, loading } = useGetFilters();

  const filters = useFilters();
  useQueryFilters(filters);
  const { limit, min, max, step } = filtersConfig();
  // const limit = 3;
  // const min = 0;
  // const max = 10000;
  // const step = 10;

  const [mobile, setMobile] = useState(false);

  useScrollControl(mobile);

  return (
    <aside className={css.aside}>
      <div className={css.filterHeader}>
        <p className={css.title}>Filters</p>
        <div className={css.filterBtn}>
          <MainBtn
            icon={true}
            version="contain"
            onClick={() => setMobile(true)}
          >
            <Filter />
          </MainBtn>
        </div>
      </div>

      <div className={`${css.filtersContainer} ${mobile ? css.mobile : ''}`}>
        <div className={css.mobileHeader}>
          <p className={css.title}>Filters</p>
          <MainBtn
            icon={true}
            version="contain"
            onClick={() => setMobile(false)}
          >
            <X />
          </MainBtn>
        </div>

        <CheckboxFiltersGroup
          title="Colors"
          items={colors}
          defaultItems={colors.slice(0, limit)}
          limit={limit}
          selected={filters.color}
          onClickCheckbox={filters.toggleColor}
          searchInputPlaceholder="Search..."
          loading={loading}
        />
        <PricesGroup
          min={min}
          max={max}
          step={step}
          filters={filters}
        />
        <CheckboxFiltersGroup
          title="Memory"
          items={memory}
          defaultItems={memory.slice(0, limit)}
          limit={limit}
          selected={filters.memory}
          onClickCheckbox={filters.toggleMemory}
          searchInputPlaceholder="Search..."
          loading={loading}
        />
      </div>
    </aside>
  );
};
