'use client';
import { SimpleForm, IForm } from '@/components/entities';
import { api } from '@/services/api/baseApi';

export const AddCategory = () => {
  const createOne = async (data: IForm) => {
    await api.category.createOne(data);
  };
  return (
    <SimpleForm
      request={createOne}
      title="Add Category"
    />
  );
};
