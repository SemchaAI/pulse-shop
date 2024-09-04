import css from './stateContainer.module.scss';

interface IProps {
  children: React.ReactNode;
}

export const StateContainer = ({ children }: IProps) => {
  return <div className={css.emptyContainer}>{children}</div>;
};
