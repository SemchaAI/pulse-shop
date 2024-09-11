'use client';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import css from './sendRate.module.scss';
import { useRouter } from 'next/navigation';
import { RatingForm } from '@/models/forms';
import { IUserSession } from '@/models/user';
import { MainBtn, Star } from '@/components/shared';
import { Field } from '@/components/features';
import { Min5 } from '@/utils/consts/validationObjects';
import { api } from '@/services/api/baseApi';
import toast from 'react-hot-toast';

interface IProps {
  productId: string;
  user: IUserSession | null;
  isRated: boolean;
}
export const SendRate = ({ productId, user, isRated }: IProps) => {
  const form = useForm<RatingForm>({
    mode: 'onBlur',
  });
  const router = useRouter();

  const [starRate, setStarRate] = useState<number>(0);
  const [starRateHover, setStarRateHover] = useState<number>(0);
  const starClass = (e: number): 'default' | 'half' | 'full' => {
    if (starRateHover !== 0 && e <= starRateHover) {
      return 'full';
    }
    if (e <= starRate) {
      return 'full';
    }
    return 'default';
  };

  if (!user)
    return (
      <section className={css.sectionSkeleton}>
        <p className={css.textSkeleton}>Log In or Register to Comment</p>
      </section>
    );

  const submitHandler: SubmitHandler<RatingForm> = async (data) => {
    // console.log('data', data);
    try {
      if (isRated) {
        await api.rate.updateRating({
          ...data,
          rate: Number(data.rate),
          productId: Number(productId),
          userId: Number(user.id),
          name: user.name,
        });
      } else {
        await api.rate.createRating({
          ...data,
          rate: Number(data.rate),
          productId: Number(productId),
          userId: Number(user.id),
          name: user.name,
        });
      }
      toast.success('Rate created');
      router.refresh();
    } catch (error) {
      console.log('[RATE POST] Error:', error);
      toast.error('Rate not created');
    }
  };

  return (
    <section className={css.sendRateSection}>
      <div className={css.sectionContainer}>
        <h3 className={css.title}>{isRated ? 'Update Rate' : 'Send Rate'}</h3>
        <FormProvider {...form}>
          <form
            className={css.form}
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <div className={css.field}>
              <div className={css.ratingRow}>
                {[1, 2, 3, 4, 5].map((e) => (
                  <div key={e}>
                    <label
                      onMouseOver={() => setStarRateHover(e)}
                      onClick={() => setStarRate(e)}
                      onMouseLeave={() => setStarRateHover(0)}
                      htmlFor={`star-${e}`}
                    >
                      <Star
                        width={20}
                        height={20}
                        className={starClass(e)}
                      />
                    </label>
                    <input
                      style={{ display: 'none' }}
                      {...form.register('rate', { required: true })}
                      type="radio"
                      value={e}
                      id={`star-${e}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Field
              label="Message"
              validation={Min5}
              placeholder="Message...(not required)"
              id="message"
            />
            <div className={css.modalControls}>
              <MainBtn
                disabled={!form.formState.isValid}
                type="submit"
                version="contain"
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Send'}
              </MainBtn>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
