'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';

export const DeleteProduct = () => {
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
      title="Delete Product"
      request={async (data) => {
        // WARNING MY TYPESCRIPT DOESN`T GOOD ENOUGH TO HANDLE THIS TYPES
        await api.products.deleteOne(data.productId);
        console.log('data', data);
      }}
    ></SimpleForm2>
  );
};
