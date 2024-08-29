import { PaymentCallbackData } from '@/models/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/utils/email-templates/OrderSuccess';
import { SucceededOrderMail } from '@/utils/mail';
import {
  CartProduct,
  Color,
  Memory,
  OrderStatus,
  Product,
  ProductItem,
  Ram,
} from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
interface IItem extends CartProduct {
  productItem: ProductItem & {
    product: Product;
    color: Color;
    memory: Memory;
    ram: Ram;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as IItem[];

    if (isSucceeded) {
      const html = OrderSuccessTemplate({ orderId: order.id, items });

      const ReactDOMServer = (await import('react-dom/server')).default;

      const orderMail = await SucceededOrderMail({
        email: order.email,
        html: ReactDOMServer.renderToStaticMarkup(html),
      });
      console.log(
        '[Checkout Callback] Success:',
        JSON.parse(order?.items as string)
      );
    } else {
      // Письмо о неуспешной оплате
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
