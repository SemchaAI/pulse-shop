'use server';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
} as SMTPTransport.Options);

interface IOrder {
  email: string;
  orderId: number;
  totalAmount: number;
  link: string;
}
interface ISucceededOrder {
  email: string;
  //orderId: number;
  // items: any[];
  html: string;
}

export const sendActivationMail = async (email: string, link: string) => {
  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Активация аккаунта на ' + process.env.API_URL,
    text: '',
    html: `
      <div className="">
        <h1>Активация аккаунта</h1>
        <p>Для активации перейдите по ссылке:
          <a href="${link}">${link}</a>
        </p>
        </div>
      `,
  });
};
export const sendOrderMail = async ({
  email,
  orderId,
  totalAmount,
  link,
}: IOrder) => {
  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Ваш заказ на сайте ' + process.env.API_URL,
    text: '',
    html: `
      <div>
        <h1>Заказ No${orderId} был принят</h1>
        <p>Сумма заказа: ${totalAmount} MDL </p>
        <p>Если вы не были перенаправлены по ссылке, то перейдите по ней в ручную: 
          <a href="${link}">Ссылка</a>
        </p>
        </div>
      `,
  });
};
export const SucceededOrderMail = async ({ email, html }: ISucceededOrder) => {
  //const html = renderToString(OrderSuccessTemplate({ orderId, items, html }));
  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Ваш заказ на сайте ' + process.env.API_URL,
    text: '',
    html: html,
  });
};
