import { StarRate } from '../StarRate';

import type { Rating } from '@prisma/client';
import css from './rateCard.module.scss';

export const RateCard = ({ id, rate, message, userId, name }: Rating) => {
  return (
    <div className={css.rateCard}>
      <div className={css.rateInfo}>
        <p>{name}</p>
        <StarRate rate={rate} />
      </div>
      <div className={css.messageContainer}>
        <p className={css.message}>{message}</p>
      </div>
    </div>
  );
};
