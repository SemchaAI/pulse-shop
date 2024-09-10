'use client';
import { SimpleForm2 } from '@/components/entities';
import { IDeleteProductItem, IProductItem } from '@/models/product';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';
import { Color, Memory, Ram } from '@prisma/client';

interface IProps {
  colors: Color[];
  memory: Memory[];
  ram: Ram[];
}
export const DeleteProductItem = ({ colors, memory, ram }: IProps) => {
  const defaultValues = {
    colorId: null,
    memoryId: null,
    ramId: null,
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
      selects={[
        {
          name: 'colorId',
          options: colors.map((color) => ({
            name: color.name,
            id: color.id,
          })),
        },
        {
          name: 'ramId',
          options: ram.map((ram) => ({
            name: ram.name,
            id: ram.id,
          })),
        },
        {
          name: 'memoryId',
          options: memory.map((memory) => ({
            name: memory.name,
            id: memory.id,
          })),
        },
      ]}
      title="Delete Product Item"
      request={async (data) => {
        // await api.products.createOneProductItem({
        //   ...data,
        //   colorId: data.colorId ? Number(data.colorId) : null,
        //   ramId: data.ramId ? Number(data.ramId) : null,
        //   memoryId: data.memoryId ? Number(data.memoryId) : null,
        // } as IProductItem);
        await api.products.deleteOneProductItem({
          productId: data.productId,
          colorId: data.colorId ? Number(data.colorId) : null,
          ramId: data.ramId ? Number(data.ramId) : null,
          memoryId: data.memoryId ? Number(data.memoryId) : null,
        } as IDeleteProductItem);

        console.log('data', data);
      }}
    ></SimpleForm2>
  );
};
