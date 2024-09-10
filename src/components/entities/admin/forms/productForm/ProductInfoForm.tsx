'use client';

import css from '../forms.module.scss';
import css2 from './productForm.module.scss';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field } from '@/components/features';
import { Input, MainBtn } from '@/components/shared';
import { required } from '@/utils/consts/validationObjects';
import { api } from '@/services/api/baseApi';
export interface IFormProduct {
  info: {
    title: string;
    description: string;
  }[];
  productId: string;
}
const defaultValues = {
  info: [
    {
      title: 'BRAND',
      description: 'Xiaomi',
    },
    {
      title: 'Weight',
      description: '0g',
    },
    {
      title: 'Display Type',
      description: 'IPS LCD',
    },
    {
      title: 'Display Size',
      description: '6.67"',
    },
    {
      title: 'Display Resolution',
      description: '720x1600px',
    },
    {
      title: 'Display Rate',
      description: '90Hz',
    },
  ],
};

export const ProductInfoForm = () => {
  const form = useForm<IFormProduct>({
    defaultValues,
    mode: 'onBlur',
  });
  const {
    fields: info,
    append: appendInfo,
    update: updateInfo,
    remove: removeInfo,
  } = useFieldArray({
    control: form.control,
    name: 'info',
  });

  const submitHandler = async (data: IFormProduct) => {
    try {
      // console.log('data', data);
      await api.products.createInfo(data);
      toast.success(`Success. Product info was added.`);
      //  form.reset();
    } catch (error) {
      console.log('error', error);
      toast.error(`Product info adding error. Please try again.`);
    }
  };

  return (
    <section className={css.categorySection}>
      <FormProvider {...form}>
        <form
          className={css.formContainer}
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <h3 className={css.title}>Add new Info`s</h3>
          {/* <select {...form.register('categoryId')}>
            {categories.map((category: Category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select> */}
          <Field
            id="productId"
            label="product Id"
            myType="text"
            validation={required}
          />
          <br />
          {/* <p>Info`s</p> */}
          <div className={css2.infoContainer}>
            <MainBtn
              version="contain"
              onClick={() =>
                appendInfo({
                  title: '',
                  description: '',
                })
              }
            >
              Add new info
            </MainBtn>
            {info.length > 0 && (
              <div className={css2.fieldsContainer}>
                {info.map((field, index) => (
                  <div
                    key={index}
                    className={css2.row}
                  >
                    <Input
                      {...form.register(`info.${index}.title`)}
                      myType="text"
                      placeholder="Title"
                      defaultValue={field.title}
                    />
                    <Input
                      {...form.register(`info.${index}.description`)}
                      myType="text"
                      placeholder="Description"
                      defaultValue={field.description}
                    />
                    <MainBtn
                      version="contain"
                      onClick={() => removeInfo(index)}
                    >
                      Delete
                    </MainBtn>
                  </div>
                ))}
              </div>
            )}
          </div>
          <MainBtn
            disabled={!form.formState.isValid}
            className={css.submitBtn}
            label="Add info`s"
            version="contain"
            type="submit"
            size="full"
          >
            Add info`s
          </MainBtn>
        </form>
      </FormProvider>
    </section>
  );
};
