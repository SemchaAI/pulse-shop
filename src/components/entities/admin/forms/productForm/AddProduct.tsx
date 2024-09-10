'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';
import { Category } from '@prisma/client';

interface IProps {
  categories: Category[];
}
export const AddProduct = ({ categories }: IProps) => {
  const defaultValues = {
    description: '',
  };

  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'description',
          label: 'Description',
          validation: required,
          myType: 'text',
        },
      ]}
      selects={[
        {
          name: 'categoryId',
          options: categories.map((category) => ({
            name: category.name,
            id: category.id,
          })),
        },
      ]}
      title="Add Product"
      request={async (data) => {
        // WARNING MY TYPESCRIPT DOESN`T GOOD ENOUGH TO HANDLE THIS TYPES
        await api.products.createOne(
          data as {
            description: string;
            categoryId: string;
          }
        );
        // await api.ram.createOne(data);
        console.log('data', data);
      }}
    ></SimpleForm2>
  );
};
