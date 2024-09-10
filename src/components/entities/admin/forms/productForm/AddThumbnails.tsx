'use client';
import { SimpleForm2 } from '@/components/entities';
import { IProductThumbnails } from '@/models/product';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';

export const AddThumbnails = () => {
  const defaultValues: IProductThumbnails = {
    thumbnails: '["key.webp","key2.webp"]',
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
        {
          id: 'thumbnails',
          label: 'Thumbnails',
          validation: required,
          myType: 'text',
        },
      ]}
      title="Add Thumbnails"
      request={async (data) => {
        await api.products.createProductItemImages({
          productItemId: data.productItemId,
          thumbnails: data.thumbnails,
        });
      }}
    ></SimpleForm2>
  );
};
