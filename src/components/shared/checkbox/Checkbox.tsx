'use client';
import React from 'react';
import css from './checkbox.module.scss';
import { Check } from 'lucide-react';

export interface FilterCheckboxProps {
  name: string;
  id: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const Checkbox = ({
  id,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}: FilterCheckboxProps) => {
  return (
    <div className={css.container}>
      <input
        type="checkbox"
        onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
        checked={checked}
        value={id}
        className={css.checkbox}
        id={`checkbox-${String(name)}-${String(id)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(id)}`}
        className={css.checkboxLabel}
      >
        <div
          className={`${css.checkboxContainer} ${checked ? css.checked : ''}`}
        >
          {checked && <Check className={css.check} />}
        </div>
        <span>{name}</span>
      </label>
      {endAdornment}
    </div>
  );
};
