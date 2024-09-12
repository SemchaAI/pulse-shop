'use client';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';

import { MainBtn } from '@/components/shared';

import { deleteUTFiles } from '@/app/actions';
import { api } from '@/services/api/baseApi';

import type { BannerSlide } from '@prisma/client';

import css from './slideList.module.scss';

interface IProps {
  slides: BannerSlide[];
}

export const SlideList = ({ slides }: IProps) => {
  const clickHandler = async (files: string[], id: number) => {
    try {
      await deleteUTFiles(files);
      await api.banner.deleteOne({ id });
      toast.success('Slide deleted');
    } catch (error) {
      toast.error('Slide deleted failed');
      console.log(error);
    }
  };
  return (
    <div className={css.slideList}>
      {slides.map((slide) => (
        <div
          className={css.slide}
          key={slide.id}
        >
          <h3>{slide.alt}</h3>
          <div className={css.slideImg}>
            <Image
              style={{ objectFit: 'contain', maxWidth: '300px' }}
              width={slide.width}
              height={slide.height}
              src={slide.desktop}
              alt={slide.alt}
            />
            <MainBtn
              version="outline"
              icon
              onClick={() =>
                clickHandler(
                  [
                    slide.desktop.split('/f/')[1],
                    slide.tablet.split('/f/')[1],
                    slide.mobile.split('/f/')[1],
                  ],
                  slide.id
                )
              }
            >
              <Trash />
            </MainBtn>
          </div>
        </div>
      ))}
    </div>
  );
};
