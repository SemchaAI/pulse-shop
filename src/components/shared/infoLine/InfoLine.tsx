import css from './infoLine.module.scss';

interface IProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  value: string | React.ReactNode;
}

export const InfoLine = ({ title, value, icon, className }: IProps) => {
  const container = ` ${css.infoRow} ${className}`;
  return (
    <div className={container}>
      <span className={css.title}>
        {icon}
        {title}
      </span>
      <div
        className={css.line}
        // className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
      />
      <span className={css.value}>{value}</span>
    </div>
  );
};
