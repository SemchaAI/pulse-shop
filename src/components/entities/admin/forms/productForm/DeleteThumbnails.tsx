'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';

export const DeleteThumbnails = () => {
  const defaultValues: { productItemId: string } = {
    productItemId: '',
  };
  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'productItemId',
          label: 'Product Item Id',
          validation: required,
          myType: 'number',
        },
      ]}
      title="Delete Thumbnails"
      request={async (data) => {
        await api.products.deleteProductItemImages({
          productItemId: data.productItemId,
        });
      }}
    ></SimpleForm2>
  );
};
