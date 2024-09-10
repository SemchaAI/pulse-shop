'use client';
import { SimpleForm2 } from '@/components/entities';
import { IProductItem } from '@/models/product';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';
import { Color, Memory, Ram } from '@prisma/client';

interface IProps {
  colors: Color[];
  memory: Memory[];
  ram: Ram[];
}
export const AddProductItem = ({ colors, memory, ram }: IProps) => {
  const defaultValues = {
    title: '',
    img: '',
    price: 0,
    oldPrice: '',
    cnt: 15,
    colorId: '',
    memoryId: '',
    ramId: '',
    productId: '',
  };
  // colors.unshift({
  //   id: -1,
  //   name: 'No color',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  // memory.unshift({
  //   id: -1,
  //   name: 'No memory',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  // ram.unshift({
  //   id: -1,
  //   name: 'No ram',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'productId',
          label: 'Product Id',
          validation: required,
          myType: 'number',
        },
        {
          id: 'title',
          label: 'Title',
          validation: required,
          myType: 'text',
        },
        {
          id: 'img',
          label: 'Preview image',
          validation: required,
          myType: 'text',
        },
        {
          id: 'price',
          label: 'Price',
          validation: required,
          myType: 'number',
        },
        {
          id: 'oldPrice',
          label: 'Old Price',
          validation: null,
          myType: 'number',
        },
        {
          id: 'cnt',
          label: 'On stock',
          validation: required,
          myType: 'number',
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
      title="Add Product Item"
      request={async (data) => {
        console.log('data', data);
        await api.products.createOneProductItem({
          ...data,
          oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
          productId: Number(data.productId),
          colorId: data.colorId ? Number(data.colorId) : null,
          ramId: data.ramId ? Number(data.ramId) : null,
          memoryId: data.memoryId ? Number(data.memoryId) : null,
        } as IProductItem);
      }}
    ></SimpleForm2>
  );
};
