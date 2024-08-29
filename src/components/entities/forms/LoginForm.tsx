'use client';
import { FormProvider, useForm } from 'react-hook-form';
import css from './loginForm.module.scss';
import { Field } from '@/components/features';
import { emailValidation, Min5 } from '@/utils/consts/validationObjects';
import { MainBtn, MainLink } from '@/components/shared';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import type { LogForm } from '@/models/forms';
import { navigate } from '@/app/actions';

interface IProps {
  className?: string;
}

export const LoginForm = ({ className }: IProps) => {
  const form = useForm<LogForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const container = `${className}`;
  const submitHandler = async (data: LogForm) => {
    console.log('data', data);
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log('response', response);
      if (!response?.ok) {
        throw Error();
      }
      if (response.ok) {
        navigate('/profile');
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Auth error. Please try again.');
    }
  };

  return (
    <div className={container}>
      <FormProvider {...form}>
        <form
          className={css.checkoutContainer}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <Field
            id="email"
            label="Email"
            myType="text"
            validation={emailValidation}
          />
          <Field
            id="password"
            label="Password"
            myType="password"
            validation={Min5}
            autoComplete="on"
          />
          <div className={css.linkBlock}>
            Don`t have an account?
            <MainLink
              version="text"
              to="/registration"
            >
              Register
            </MainLink>
          </div>
          <MainBtn
            disabled={!form.formState.isValid}
            className={css.submitBtn}
            label="Sign in"
            version="contain"
            type="submit"
            size="full"
          >
            Sign in
          </MainBtn>
        </form>
      </FormProvider>
    </div>
  );
};
