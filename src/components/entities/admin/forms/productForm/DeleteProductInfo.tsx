'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';

export const DeleteProductInfo = () => {
  const defaultValues = {
    productId: '',
  };

  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'productId',
          label: 'Product Id',
          validation: required,
          myType: 'text',
        },
      ]}
      title="Delete Product Info"
      request={async (data) => {
        await api.products.deleteInfo(data);
      }}
    ></SimpleForm2>
  );
};
