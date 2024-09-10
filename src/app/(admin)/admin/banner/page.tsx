import { AddSlide, HeaderBanner, SlideList } from '@/components/entities';
import { UploadThing } from '@/components/features';
import { Container } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { OPTIONS } from '@/utils/consts/HeaderBanner';
export default async function BannerPage() {
  const slides = await prisma.bannerSlide.findMany();
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
          <AddSlide />
        </div>
      </div>
      <SlideList slides={slides} />
    </Container>
  );
}
