'use client';
import { User } from '@prisma/client';
import css from './profileForm.module.scss';
import { MainBtn } from '@/components/shared';
import type { RegistrationForm } from '@/models/forms';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Field, FieldPhone } from '@/components/features';
import {
  emailValidation,
  Min5,
  PhoneValidation,
  ReqMin5Max20Validation,
} from '@/utils/consts/validationObjects';
import { updateUserInfo } from '@/app/actions';
import { deleteToken } from '@/utils/helpers/deleteToken';

interface IProps {
  user: User;
}
interface IUserUpdated extends RegistrationForm {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export const ProfileForm = ({ user }: IProps) => {
  const form = useForm<IUserUpdated>({
    defaultValues: {
      email: user.email,
      name: user.name,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: IUserUpdated) => {
    try {
      console.log('data', data);
      await updateUserInfo({
        email: data.email,
        name: data.name,
        password: data.password,

        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });
      toast.success('Profile updated');
    } catch (error) {
      return toast.error('Update error. Please try again.');
    }
  };

  const signOutHandler = () => {
    signOut({
      callbackUrl: '/',
    });
    deleteToken();
  };

  return (
    <div className={css.profileContainer}>
      <FormProvider {...form}>
        <form className={css.form}>
          <Field
            id="name"
            label="Name"
            autoComplete="name"
            myType="text"
            validation={ReqMin5Max20Validation}
          />
          <Field
            id="email"
            label="Email"
            autoComplete="email"
            myType="text"
            validation={emailValidation}
          />
          <Field
            id="firstName"
            label="First Name"
            autoComplete="given-name"
            myType="text"
            validation={ReqMin5Max20Validation}
          />
          <Field
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            myType="text"
            validation={ReqMin5Max20Validation}
          />
          <FieldPhone
            id="phone"
            label="Phone"
            autoComplete="tel"
            myType="text"
            validation={PhoneValidation}
          />
          <Field
            id="password"
            label="Password"
            autoComplete="new-password"
            myType="password"
            validation={Min5}
          />
          <Field
            id="confirmPassword"
            label="Confirm password"
            myType="password"
            autoComplete="new-password"
            validation={{
              validate: (value: string) => {
                if (value !== form.getValues('password')) {
                  return 'Passwords do not match';
                }
              },
            }}
          />
          <div className={css.controls}>
            <MainBtn
              type="submit"
              version="contain"
              label="Save changes"
              onClick={form.handleSubmit(onSubmit)}
            >
              Save changes
            </MainBtn>
            <MainBtn
              label="Sign out"
              version="outline"
              type="button"
              onClick={signOutHandler}
            >
              Sign out
            </MainBtn>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
