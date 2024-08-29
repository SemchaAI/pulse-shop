import { PaymentData } from '@/models/yookassa';
import axios from 'axios';
import { randomUUID } from 'crypto';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  // <PaymentData>
  try {
    const { data } = await axios.post<PaymentData>(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: details.amount.toString(),
          currency: 'RUB',
        },
        capture: true,
        description: details.description,
        metadata: {
          order_id: details.orderId,
        },
        confirmation: {
          type: 'redirect',
          return_url: process.env.YOOKASSA_CALLBACK_URL,
        },
      },
      {
        auth: {
          username: process.env.YOOKASSA_STORE_ID as string,
          password: process.env.YOOKASSA_API_KEY as string,
        },
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': randomUUID(),
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
