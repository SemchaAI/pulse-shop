import React from 'react';
import css from './select.module.scss';

export const SortingSelect = () => {
  return (
    <select className={css.select}>
      <option value="asc">asc</option>
      <option value="desc">desc</option>
    </select>
  );
};
