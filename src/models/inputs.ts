import { ValidationTypes } from '@/utils/consts/validationObjects';
import {
  FieldError,
  FieldValue,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export interface MainInputProps
  extends IInputTypes,
    React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined | null | 'never';
  className?: string;
  value?: string;
  id?: string;
  placeholder?: string;
  onFocus?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IInputTypes {
  myType?: 'number' | 'text' | 'email' | 'file' | 'password';
}

export interface IField extends Pick<MainInputProps, 'myType' | 'placeholder'> {
  id: string;
  label: string;
  autoComplete?: string;

  validation: ValidationTypes;
}

// export interface IFieldMockUp extends Omit<IField, 'register' | 'error'> {}
