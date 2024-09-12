'use client';
import { FormProvider, useForm } from 'react-hook-form';

import { CartItem, CheckoutPayment } from '@/components/entities';
import { Field, FieldPhone } from '@/components/features';
import { CardBlock, Container, Skeleton, TextArea } from '@/components/shared';

import { useCart } from '@/utils/hooks';
import { createOrder } from '@/app/actions';

import type { CheckoutRequest } from '@/models/checkout';

import { fields } from '@/utils/consts/Checkout';
import { PhoneValidation, required } from '@/utils/consts/validationObjects';

import css from './checkout.module.scss';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/services/api/baseApi';
import { Role } from '@prisma/client';

export const CheckoutSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await api.user.getUser();
      form.setValue('firstName', data.firstName || '');
      form.setValue('lastName', data.lastName || '');
      form.setValue('phone', data.phone || '');
      form.setValue('email', data.email);
    };
    if (session && session.user.role !== Role.GUEST) {
      fetchUserInfo();
    }
  }, [session]);

  const form = useForm<CheckoutRequest>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      //-----
      address: '',
      textarea: '',
    },
    mode: 'onBlur',
  });

  const submitHandler = async (data: CheckoutRequest) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success('Order created. Redirecting...', {
        duration: 5000,
        icon: '✅',
      });
      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      toast.error('Wrong form data', { duration: 5000, icon: '❌' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={css.checkout}>
      <Container>
        <h2 className={css.title}>Checkout</h2>
        <FormProvider {...form}>
          <form
            className={css.checkoutContainer}
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div className={css.checkoutList}>
              <CardBlock title="1. Cart">
                <ul className={css.cartItems}>
                  {loading && (
                    <Skeleton
                      width="100%"
                      height="100%"
                    />
                  )}
                  {!loading &&
                    items.map((item, i) => {
                      return (
                        <CartItem
                          index={i}
                          key={item.id}
                          item={item}
                          updateItemQuantity={updateItemQuantity}
                          removeCartItem={removeCartItem}
                        />
                      );
                    })}
                </ul>
              </CardBlock>
              <CardBlock title="2. Personal Information">
                <div className={css.personalInfo}>
                  {fields.map((field) => (
                    <Field
                      id={field.id}
                      key={field.id}
                      label={field.label}
                      myType={field.myType}
                      autoComplete={field.autoComplete}
                      validation={field.validation}
                    />
                  ))}
                  <FieldPhone
                    id="phone"
                    label="Phone"
                    autoComplete="tel"
                    myType="text"
                    validation={PhoneValidation}
                  />
                </div>
              </CardBlock>
              <CardBlock title="3. Delivery Details">
                <Field
                  id="address"
                  label="Address"
                  placeholder="str. Example, 123"
                  myType="text"
                  autoComplete="street address1"
                  validation={required}
                />
                <label htmlFor="textarea"> Your comments </label>
                <TextArea
                  placeholder="textarea"
                  id="textarea"
                />
              </CardBlock>
            </div>
            <div className={css.payment}>
              <CheckoutPayment
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </form>
        </FormProvider>
      </Container>
    </section>
  );
};
