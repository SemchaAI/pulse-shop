'use client';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

import { Minus, Plus, X } from 'lucide-react';

import { MainBtn } from '@/components/shared';

import type { ICartItemUI } from '@/models/cartFavor';

import css from './cartItem.module.scss';

interface IProps {
  item: ICartItemUI;
  index: number;

  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

enum PlusMinus {
  plus = 'plus',
  minus = 'minus',
}

export const CartItem = ({
  item,
  index,
  updateItemQuantity,
  removeCartItem,
}: IProps) => {
  const url = process.env.NEXT_PUBLIC_IMAGES_HOST;

  const clickQuantityHandler = async (
    variant: PlusMinus,
    item: ICartItemUI
  ) => {
    if (item.cnt <= item.quantity && variant === PlusMinus.plus) {
      toast.error('Max quantity is ' + item.cnt);
      return;
    }
    if (item.quantity <= 1 && variant === PlusMinus.minus) {
      toast.error('Min quantity is 1');
      return;
    }
    if (variant === PlusMinus.plus && item.cnt > item.quantity) {
      await updateItemQuantity(item.id, item.quantity + 1);
      toast.success('success');
      return;
    } else if (variant === PlusMinus.minus && item.quantity > 1) {
      await updateItemQuantity(item.id, item.quantity - 1);
      toast.success('success');
      return;
    }
  };
  // const clickRemoveHandler = (id: number) => {
  //   try {
  //     removeCartItem(id);
  //     toast.success('Item removed');
  //   } catch (error) {
  //     toast.error('Something went wrong. Please try again.');
  //   }
  // };

  return (
    <motion.li
      layout
      // layoutId={item.productItemId.toString()}
      exit={{ x: -2000 }}
      transition={{ duration: 0.7 }}
      className={`${css.cartItem} ${item.disabled ? css.disabled : ''}`}
    >
      <div className={css.cartItemContainer}>
        <Link
          className={css.productLink}
          href={`product/${item.productItemId}/${item.id}`}
        >
          <Image
            priority={index > 1 ? false : true}
            width={200}
            height={200}
            sizes="(max-width: 600px) 150px,(max-width: 375px) 100px,200px"
            className={css.cartItemImg}
            src={url + '/' + item.img}
            alt={item.title}
          />
        </Link>
        <div className={css.cartItemInfo}>
          <h3 className={css.cartItemTitle}>{item.title}</h3>
          <div>
            <span>Quantity:</span>
            <div className={css.cartItemQuantity}>
              <MainBtn
                version="outline"
                icon={true}
                onClick={() => clickQuantityHandler(PlusMinus.minus, item)}
              >
                <Minus
                  width={24}
                  height={24}
                />
              </MainBtn>
              <span className={css.cartItemQuantityValue}>{item.quantity}</span>

              <MainBtn
                version="outline"
                icon={true}
                onClick={() => clickQuantityHandler(PlusMinus.plus, item)}
              >
                <Plus
                  width={24}
                  height={24}
                />
              </MainBtn>
            </div>
          </div>
          <div className={css.cartItemPrice}>
            <span>Price:</span>
            {item.price}
            <b>MDL</b>
          </div>
        </div>
      </div>
      <div className={css.btnsContainer}>
        <MainBtn
          version="outline"
          icon={true}
          onClick={() => removeCartItem(item.id)}
        >
          <X
            width={24}
            height={24}
            className={css.cartItemBtnIcon}
          />
        </MainBtn>
      </div>
    </motion.li>
  );
};
