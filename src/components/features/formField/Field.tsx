'use client';
import { Input } from '@/components/shared';

import css from './field.module.scss';

import type { IField } from '@/models/inputs';
import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

export const Field = ({
  id,
  label,
  autoComplete,
  validation,
  placeholder = label,
  myType,
}: IField) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(id);
  const error = errors[id]?.message as string;

  const onClickClear = () => {
    setValue(id, '');
  };

  return (
    <div className={css.field}>
      <label
        className={css.label}
        htmlFor={id}
      >
        {label}:
      </label>
      <div className={css.inputContainer}>
        <Input
          id={id}
          myType={myType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          {...register(id, validation ? validation : {})}
        />
        {value && myType !== 'number' ? (
          <X
            className={css.icon}
            size={24}
            onClick={onClickClear}
          />
        ) : null}
      </div>

      <div className={css.error}>{error}</div>
    </div>
  );
};
