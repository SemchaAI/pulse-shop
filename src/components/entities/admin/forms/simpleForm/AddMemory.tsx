'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';

export const AddMemory = () => {
  const defaultValues = {
    name: '',
  };

  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'name',
          label: 'Name',
          validation: required,
          myType: 'text',
        },
      ]}
      title="Add Memory"
      request={async (data) => {
        await api.memory.createOne(data);
      }}
    />
  );
};
