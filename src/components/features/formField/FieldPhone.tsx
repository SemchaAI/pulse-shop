'use client';
import { Input } from '@/components/shared';

import css from './field.module.scss';

import type { IField } from '@/models/inputs';
import { Controller, useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

import { LegacyRef, useState } from 'react';
import { useIMask } from 'react-imask';

export const FieldPhone = ({
  id,
  label,
  validation,
  placeholder = label,
  autoComplete,
  myType,
}: IField) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const [opts, setOpts] = useState({ mask: '+0 (00) 00-00-00' });
  const {
    ref,
    // maskRef,
    value: maskValue,
    //setValue: setMaskValue,
    // unmaskedValue,
    setUnmaskedValue,
    // typedValue,
    // setTypedValue,
    //setUnmaskedValue,
  } = useIMask(opts);

  const value = watch(id);
  const error = errors[id]?.message as string;

  const onClickClear = () => {
    setValue(id, '');
    setUnmaskedValue('');
  };
  console.log('value', value, 'maskValue', maskValue);

  return (
    <div className={css.field}>
      <label
        className={css.label}
        htmlFor={id}
      >
        {label}:
      </label>
      <div className={css.inputContainer}>
        <Controller
          name={id}
          control={control}
          rules={validation ? validation : {}}
          render={({ field: { value, onChange } }) => (
            <Input
              id={id}
              myType={myType}
              autoComplete={autoComplete}
              placeholder={placeholder}
              ref={ref as LegacyRef<HTMLInputElement>}
              onChange={(e) => {
                setUnmaskedValue(e.target.value);
                onChange(e.target.value);
              }}
              value={maskValue}
            />
          )}
        />
        {value && (
          <X
            className={css.icon}
            size={24}
            onClick={onClickClear}
          />
        )}
      </div>

      <div className={css.error}>{error}</div>
    </div>
  );
};
