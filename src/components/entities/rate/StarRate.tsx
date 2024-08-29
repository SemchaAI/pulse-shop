import { Star } from '@/components/shared';

interface IClassName {
  rate: number;
  className?: string;
  onClick?: (e: number) => number;
}
type TCurrClass = 'default' | 'half' | 'full';

export const StarRate = ({ rate, className }: IClassName) => {
  const isInteger = rate % 1 === 0;
  const classCalc = (e: number) => {
    // if (mockupRate < 0) return 'default';
    let currClass: TCurrClass = e <= rate ? 'full' : 'default';
    if (!isInteger && currClass === 'default' && e - 1 <= rate) {
      currClass = 'half';
    }
    // console.log('CURRCLASS', currClass, rate, e);
    return currClass;
  };
  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((e) => (
        <Star
          width={20}
          height={20}
          className={classCalc(e)}
          key={e}
        />
      ))}
    </div>
  );
};
