import { CardBlock, InfoLine, MainBtn, Skeleton } from '@/components/shared';
import css from './checkoutPayment.module.scss';
import { Loader, Percent, ShoppingCart, Truck } from 'lucide-react';

interface IProps {
  className?: string;
  totalAmount: number;
  loading: boolean;
}

export const CheckoutPayment = ({ totalAmount, loading }: IProps) => {
  //tmp here
  const NDS = Math.round(totalAmount * 20) / 1e2;
  const DeliveryPrice = 50;
  const totalPrice = totalAmount + NDS + DeliveryPrice;

  //console.log('loading', loading);
  return (
    <CardBlock>
      <div className={css.paymentTotal}>
        <span>Total:</span>
        {loading ? (
          <Skeleton
            height="24px"
            width="50%"
          />
        ) : (
          <span>{totalPrice} MDL</span>
        )}
      </div>

      <div className={css.paymentInfo}>
        <InfoLine
          title="Items Price:"
          value={
            loading ? (
              <Skeleton
                height="24px"
                width="65px"
              />
            ) : (
              `${totalAmount} MDL`
            )
          }
          className={css.infoLine}
          icon={<ShoppingCart size={20} />}
        />
        <InfoLine
          title="Delivery:"
          value={
            loading ? (
              <Skeleton
                height="24px"
                width="65px"
              />
            ) : (
              `${DeliveryPrice} MDL`
            )
          }
          className={css.infoLine}
          icon={<Truck size={20} />}
        />
        <InfoLine
          title="NDS:"
          value={
            loading ? (
              <Skeleton
                height="24px"
                width="65px"
              />
            ) : (
              `${NDS} MDL`
            )
          }
          className={css.infoLine}
          icon={<Percent size={20} />}
        />
      </div>

      <MainBtn
        disabled={loading}
        className={css.paymentBtn}
        size="full"
        type="submit"
        version="contain"
      >
        {loading ? (
          <Loader
            className="rotate360"
            size={24}
          />
        ) : (
          'Order now'
        )}
      </MainBtn>
    </CardBlock>
  );
};
