'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

import { AddSlide, HeaderBanner, SlideList } from '@/components/entities';
import { UploadThing } from '@/components/features';
import { Container } from '@/components/shared';

import { api } from '@/services/api/baseApi';
import { OPTIONS } from '@/utils/consts/HeaderBanner';

import type { BannerSlide } from '@prisma/client';

export default function BannerPage() {
  // const slides = await prisma.bannerSlide.findMany();
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // Fetch slides
  const fetchSlides = async () => {
    const response = await api.banner.getAll();
    setSlides(response);
  };
  useLayoutEffect(() => {
    fetchSlides();
  }, [updateFlag]);

  return (
    <Container>
      {/* <SlideList slides={slides} /> */}
      <HeaderBanner
        slides={slides}
        options={OPTIONS}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, maxWidth: '50%' }}>
          <UploadThing />
        </div>
        <div style={{ flexGrow: 1, maxWidth: '50%' }}>
          <AddSlide onSlideAdded={() => setUpdateFlag(!updateFlag)} />
        </div>
      </div>
      <SlideList
        slides={slides}
        onSlideAdded={() => setUpdateFlag(!updateFlag)}
      />
    </Container>
  );
}
