'use client';
import { FormProvider, useForm } from 'react-hook-form';
import css from './loginForm.module.scss';
import { Field } from '@/components/features';
import {
  emailValidation,
  Min5,
  ReqMin5Max20Validation,
} from '@/utils/consts/validationObjects';
import { MainBtn, MainLink } from '@/components/shared';
import { RegistrationForm } from '@/models/forms';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

interface IProps {
  className?: string;
}

export const RegisterForm = ({ className }: IProps) => {
  const form = useForm<RegistrationForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    mode: 'onBlur',
  });

  const container = `${className}`;
  const submitHandler = async (data: RegistrationForm) => {
    try {
      const isRegistered = await registerUser(data);
      if (!isRegistered) {
        throw Error();
      }
      toast.success('User created. Please check your email');
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
            id="name"
            label="Name"
            myType="text"
            validation={ReqMin5Max20Validation}
          />
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
          />
          <Field
            id="confirmPassword"
            label="Confirm password"
            myType="password"
            validation={{
              validate: (value: string) => {
                if (value !== form.getValues('password')) {
                  return 'Passwords do not match';
                }
              },
            }}
          />
          <div className={css.linkBlock}>
            Already have an account?
            <MainLink
              version="text"
              to="/login"
            >
              Sign in
            </MainLink>
          </div>
          <MainBtn
            disabled={!form.formState.isValid}
            className={css.submitBtn}
            label="Register"
            version="contain"
            type="submit"
            size="full"
          >
            Registration
          </MainBtn>
        </form>
      </FormProvider>
    </div>
  );
};
