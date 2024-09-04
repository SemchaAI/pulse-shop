'use client';

import css from '../forms.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field } from '@/components/features';
import { MainBtn } from '@/components/shared';
import { required } from '@/utils/consts/validationObjects';

export interface IForm {
  name: string;
}
interface IProps {
  title: string;
  request(data: IForm): Promise<void>;
}

export const SimpleForm = ({ title, request }: IProps) => {
  const form = useForm<IForm>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });
  const submitHandler = async (data: IForm) => {
    try {
      await request(data);
      toast.success(`${title} success`);
      form.reset();
    } catch (error) {
      console.log('error', error);
      toast.error(`${title} error. Please try again.`);
    }
  };

  return (
    <section className={css.categorySection}>
      <FormProvider {...form}>
        <form
          className={css.formContainer}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <h3 className={css.title}>{title}</h3>
          <Field
            id="name"
            label="Name"
            myType="text"
            validation={required}
          />
          <MainBtn
            disabled={!form.formState.isValid}
            className={css.submitBtn}
            label={title}
            version="contain"
            type="submit"
            size="full"
          >
            {title}
          </MainBtn>
        </form>
      </FormProvider>
    </section>
  );
};
