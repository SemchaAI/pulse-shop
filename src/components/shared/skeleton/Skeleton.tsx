import css from './skeleton.module.scss';

interface IProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}
export const Skeleton = ({
  width = '100%',
  height = 'auto',
  borderRadius = '5px',
}: IProps) => {
  return (
    <div
      style={{ width, height, borderRadius }}
      className={css.skeleton}
    ></div>
  );
};
