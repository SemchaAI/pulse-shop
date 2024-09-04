'use client';
import { SimpleForm, IForm } from '@/components/entities';
import { api } from '@/services/api/baseApi';

export const DeleteCategory = () => {
  const deleteOne = async (data: IForm) => {
    await api.category.deleteOne(data);
  };
  return (
    <SimpleForm
      request={deleteOne}
      title="Delete Category"
    />
  );
};
