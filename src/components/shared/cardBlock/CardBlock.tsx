import css from './cardBlock.module.scss';

interface IProps {
  children: React.ReactNode;
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
}

export const CardBlock = ({
  title,
  endAdornment,
  className,
  children,
}: IProps) => {
  return (
    <div className={` ${css.cardBlock} ${className || ''}`}>
      {title && (
        <div className={css.cardBlockHeader}>
          <h3 className={css.title}>{title}</h3>
          {endAdornment}
        </div>
      )}
      <div className={css.content}> {children}</div>
    </div>
  );
};
