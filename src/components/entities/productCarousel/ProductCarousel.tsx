'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import { Thumbnail } from './Thumbnail';
import css from './productCarousel.module.scss';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/features';
// import {
//   NextButton,
//   PrevButton,
//   usePrevNextButtons,
// } from '@/components/features/CarouselControls/ArrowButtons';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const url = process.env.NEXT_PUBLIC_IMAGES_HOST as string;

  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    // containScroll: 'keepSnaps',
    // dragFree: true,
    slidesToScroll: 1,
    axis: 'y',
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className={css.embla}>
      <div
        className={css.emblaViewport}
        ref={emblaMainRef}
      >
        <div className={css.emblaContainer}>
          {slides.map((img) => (
            <div
              className={css.emblaSlide}
              key={img}
            >
              <div className={css.emblaSlideNumber}>
                <Image
                  className={css.emblaSlideMainImg}
                  priority={true}
                  width="450"
                  height="450"
                  src={url + img}
                  // alt={product.title}
                  alt="product image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={css.emblaThumbs}>
        <div
          className={css.emblaThumbsViewport}
          ref={emblaThumbsRef}
        >
          <div className={css.emblaThumbsContainer}>
            {slides.map((img, index) => (
              <Thumbnail
                url={url}
                key={img}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                img={img}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={css.emblaButtons}>
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};
