'use server';
import { CheckoutRequest } from '@/models/checkout';
import { prisma } from '@/prisma/prisma-client';
import { createPayment } from '@/utils/createPayment';
import { getUserSession } from '@/utils/helpers/getUserSession';
import { sendActivationMail, sendOrderMail } from '@/utils/mail';
import { OrderStatus, Prisma, Role } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UTApi } from 'uploadthing/server';

export async function createOrder(data: CheckoutRequest) {
  try {
    const session = await getUserSession();
    // const cookiesStore = cookies();
    // const token = cookiesStore.get('token')?.value;

    if (!session) {
      throw new Error('User not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartProduct: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        userId: Number(session.id),
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.textarea,

        totalAmount: userCart.totalAmount,
        userId: userCart.userId,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartProduct),
      },
    });
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartProduct.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //todo link CheckoutPayment to order

    const paymentData = await createPayment({
      amount: userCart.totalAmount,
      orderId: order.id,
      description: 'Payment for order #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment not created');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;
    //----------------------------------

    const orderMail = await sendOrderMail({
      email: data.email,
      orderId: order.id,
      totalAmount: userCart.totalAmount,
      link: paymentUrl,
    });

    if (!orderMail.accepted) {
      throw new Error('Order mail not sent');
    }

    return paymentUrl;
  } catch (error) {
    console.log(`[CREATE ORDER] server error ${error}`);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currUser = await getUserSession();
    if (!currUser) {
      throw new Error('User not found');
    }
    const findUser = await prisma.user.findUnique({
      where: {
        id: Number(currUser.id),
      },
    });

    if (!findUser) {
      throw new Error('User not found');
    }

    const newPass = body.password
      ? hashSync(body.password as string, 10)
      : findUser.password;

    await prisma.user.update({
      where: {
        id: Number(currUser.id),
      },
      data: {
        email: body.email,
        name: body.name,
        password: newPass,

        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
      },
    });
  } catch (error) {
    console.log(`[UPDATE USER INFO] server error ${error}`);
    throw error;
  }
}
export async function registerUser(
  //tokenRef will be created if not exists
  body: Omit<Prisma.UserCreateInput, 'tokenRef'>
) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      if (!findUser.verified) {
        throw new Error('User not verified. Check your email');
      }
      throw new Error('User already exists');
    }
    const session = await getUserSession();
    let newUser;
    if (!session || session.role !== Role.GUEST) {
      newUser = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashSync(body.password, 10),
          role: 'USER' as Role,
        },
      });
    } else {
      newUser = await prisma.user.update({
        where: {
          id: Number(session.id),
        },
        data: {
          name: body.name,
          email: body.email,
          password: hashSync(body.password, 10),
          role: 'USER' as Role,
        },
      });
    }

    //throw new Error('Unexpected error. Session not found');

    // const guestUser = await prisma.user.findUnique({
    //   where: {
    //     id: Number(session.id),
    //   },
    // });

    //if (!guestUser) throw new Error('Unexpected error. Guest user not found');

    const verificationCode = await prisma.verificationCode.create({
      data: {
        code: randomUUID(),
        userId: newUser.id,
      },
    });
    if (!verificationCode) {
      throw new Error('Code not created');
    }

    const activationUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/activation?link=${verificationCode.code}`;

    await sendActivationMail(newUser.email, activationUrl);
    const cookieStore = cookies();
    cookieStore.set('newUser', `${newUser.id}`);
    // return {
    //   id: newUser.id,
    //   isRegistered: true,
    // };
    return true;
  } catch (error) {
    console.log(`[REGISTER USER] server error ${error}`);
    throw error;
  }
}

export async function navigate(data: string) {
  redirect(`${data}`);
}

const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.error('UTAPI: Error deleting files', error);
  }
};
