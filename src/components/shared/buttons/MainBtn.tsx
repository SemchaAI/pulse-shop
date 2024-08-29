import css from './mainBtn.module.scss';
import { IBtn } from '@/models/mainBtn';
interface IBtnProps extends IBtn {
  children?: React.ReactNode;
  className?: string;
}

export const MainBtn = function ({
  className = '',
  children,
  version = 'text',
  size = 'default',
  icon = false,
  type = 'button',
  disabled = false,
  label = 'button',
  onClick,
  ...props
}: IBtnProps) {
  const btnClass = `${css.button} ${css[version]} ${icon ? css.icon : ''} 
  ${css[size]} ${className}`;
  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
};
