import { CartProduct, Product, ProductItem } from '@prisma/client';
import React from 'react';

interface OrderItems extends CartProduct {
  productItem: ProductItem;
}

interface Props {
  orderId: number;
  items: OrderItems[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>

    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.title} | {item.productItem.price} ₽ x{' '}
          {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
