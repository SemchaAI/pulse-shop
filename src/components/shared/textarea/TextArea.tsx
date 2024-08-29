'use client';

import css from './textArea.module.scss';
import { useFormContext } from 'react-hook-form';

interface IProps {
  id: string;
  className?: string;
  placeholder?: string;
}

export const TextArea = ({ id, placeholder, className, ...props }: IProps) => {
  const inputClass = `${css.textarea} ${className || ''}`;
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(id);

  return (
    <div className={css.container}>
      <textarea
        className={inputClass}
        id={id}
        placeholder={placeholder}
        value={value}
        {...register(id)}
        {...props}
      ></textarea>
    </div>
  );
};
TextArea.displayName = 'TextArea';
