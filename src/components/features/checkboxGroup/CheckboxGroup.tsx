'use client';
import React from 'react';
import { type FilterCheckboxProps, Checkbox } from '@/components/shared';
import css from './checkboxGroup.module.scss';
import { Input, MainBtn, Skeleton } from '@/components/shared';
import { Minus, Plus } from 'lucide-react';
// import { Input } from '../ui/input';
// import { Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  loading,
  onClickCheckbox,
  selected,
}: Props) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={css.container}>
        <div className={css.titleContainer}>
          <p className={css.title}>{title}</p>
          <Skeleton
            width="24px"
            height="24px"
            borderRadius="8px"
          />
        </div>

        <div className={`${css.checkboxList}`}>
          {...Array(limit)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                width="100%"
                height="24px"
                borderRadius="8px"
              />
            ))}
        </div>
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={css.container}>
      <div className={css.titleContainer}>
        <p className={css.title}>{title}</p>
        {items.length > limit && (
          <MainBtn
            icon
            type="button"
            version="text"
            className={css.showBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <Minus size={24} /> : <Plus size={24} />}
          </MainBtn>
        )}
      </div>

      {showAll && (
        <div className="mb-5">
          <Input
            myType="text"
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            // className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className={`${css.checkboxList}`}>
        {list.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            name={item.name}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.id)}
            onCheckedChange={() => onClickCheckbox?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
