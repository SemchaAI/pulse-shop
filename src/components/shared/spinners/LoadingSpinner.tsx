import css from './loading.module.scss';
interface IProps {
  version: 'circle' | 'any';
  width: number;
  height?: number;
}
export const LoadingSpinner = ({ width, height, version }: IProps) => {
  const isCircle = version === 'circle';
  return (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={isCircle ? width : height}
      className={`${css.loader}   ${isCircle ?? css.circle} rotate360`}
    />
  );
};
