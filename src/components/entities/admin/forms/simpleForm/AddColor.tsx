'use client';
import { SimpleForm, IForm } from '@/components/entities';
import { api } from '@/services/api/baseApi';

export const AddColor = () => {
  const createOne = async (data: IForm) => {
    await api.color.createOne(data);
  };
  return (
    <SimpleForm
      request={createOne}
      title="Add Color"
    />
  );
};
