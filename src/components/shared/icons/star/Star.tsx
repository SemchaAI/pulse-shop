import css from './star.module.scss';

interface IStar {
  className: 'half' | 'full' | 'default';
  width?: number;
  height?: number;
}

export const Star = ({ className, width, height }: IStar) => {
  let ArrClasses = [css.default, css.default];

  if (className === 'half') {
    ArrClasses = [css.default, css.active];
  } else if (className === 'full') {
    ArrClasses = [css.active, css.active];
  }

  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        className={ArrClasses[0]}
        d="M21.951 9.67a1 1 0 0 0-.807-.68l-5.699-.828-2.548-5.164A.978.978 0 0 0 12 2.486v16.28l5.097 2.679a1 1 0 0 0 1.451-1.054l-.973-5.676 4.123-4.02a1 1 0 0 0 .253-1.025z"
      ></path>
      <path
        className={ArrClasses[1]}
        d="M11.103 2.998 8.555 8.162l-5.699.828a1 1 0 0 0-.554 1.706l4.123 4.019-.973 5.676a1 1 0 0 0 1.45 1.054L12 18.765V2.503c-.356.001-.703.167-.897.495z"
      ></path>
    </svg>
  );
};
