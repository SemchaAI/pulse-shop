'use client';

import css from '../forms.module.scss';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field } from '@/components/features';
import { MainBtn } from '@/components/shared';
import { ValidationTypes } from '@/utils/consts/validationObjects';
import { IInputTypes } from '@/models/inputs';

interface IField extends IInputTypes {
  id: string;
  label: string;
  validation: ValidationTypes;
  myType: IInputTypes['myType'];
}
interface IProps<T> {
  defaultValues: DefaultValues<T>;
  data?: IField[];
  title: string;
  request(data: T): Promise<void>;
  selects?: ISelect[];
}
interface ISelect {
  name: string;
  options: { name: string; id: number }[];
}

export const SimpleForm2 = <T extends FieldValues>(props: IProps<T>) => {
  const { defaultValues, data, title, request, selects } = props;
  const form = useForm({
    defaultValues,
    mode: 'onBlur',
  });
  const submitHandler = async (data: T) => {
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
          {selects?.map((select) => (
            <select
              key={select.name}
              id={select.name}
              {...form.register(select.name as Path<T>)}
            >
              <option
                key={-1}
                value=""
              >
                No data
              </option>
              {select.options.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </select>
          ))}
          {data?.map((field) => (
            <Field
              key={field.id}
              id={field.id}
              label={field.label}
              myType={field.myType}
              validation={field.validation}
            />
          ))}
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
