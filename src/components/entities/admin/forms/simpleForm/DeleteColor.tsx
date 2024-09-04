'use client';
import { SimpleForm, IForm } from '@/components/entities';
import { api } from '@/services/api/baseApi';

export const DeleteColor = () => {
  const deleteOne = async (data: IForm) => {
    await api.color.deleteOne(data);
  };
  return (
    <SimpleForm
      request={deleteOne}
      title="Delete Color"
    />
  );
};
