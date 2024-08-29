import css from './container.module.scss';

interface IProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Container = ({ children, style = {} }: IProps) => {
  return (
    <div
      style={style}
      className={css.wrapper}
    >
      {children}
    </div>
  );
};
