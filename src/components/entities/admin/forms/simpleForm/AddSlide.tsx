'use client';
import { SimpleForm2 } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import { required } from '@/utils/consts/validationObjects';
import type { BannerSlide } from '@prisma/client';

export const AddSlide = () => {
  const defaultValues: Omit<BannerSlide, 'id'> = {
    desktop: '',
    tablet: '',
    mobile: '',
    alt: '',
    href: '',
    base64:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    priority: true,
    width: 1340,
    height: 560,
  };

  return (
    <SimpleForm2
      defaultValues={defaultValues}
      data={[
        {
          id: 'desktop',
          label: 'Desktop url',
          validation: required,
          myType: 'text',
        },
        {
          id: 'tablet',
          label: 'Tablet url',
          validation: required,
          myType: 'text',
        },
        {
          id: 'mobile',
          label: 'Mobile url',
          validation: required,
          myType: 'text',
        },
        {
          id: 'alt',
          label: 'Description',
          validation: required,
          myType: 'text',
        },
        {
          id: 'href',
          label: 'url to product',
          validation: required,
          myType: 'text',
        },
        {
          id: 'base64',
          label: 'Base64',
          validation: required,
          myType: 'text',
        },
      ]}
      title="Add Banner"
      request={async (data) => {
        await api.banner.createOne(data);
      }}
    />
  );
};
