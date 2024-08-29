import { forwardRef } from 'react';
import type { MainInputProps } from '@/models/inputs';
import css from './mainInput.module.scss';

export const Input = forwardRef<HTMLInputElement, MainInputProps>(
  ({ error = null, myType = 'text', value, className, ...props }, ref) => {
    const inputClass = `${css[myType]}  ${className || ''}`;
    return (
      <input
        className={inputClass}
        ref={ref}
        id={props.id}
        type={myType}
        placeholder={props.placeholder}
        value={value}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
