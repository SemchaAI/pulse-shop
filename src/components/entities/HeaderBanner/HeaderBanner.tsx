'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/shared';
import {
  DotButton,
  useDotButton,
} from '@/components/features/CarouselControls/DotButtons';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '@/components/features/CarouselControls/ArrowButtons';

import type { BannerSlide } from '@prisma/client';
import type { EmblaOptionsType } from 'embla-carousel';

import css from './headerBanner.module.scss';

type PropType = {
  slides: BannerSlide[];
  options?: EmblaOptionsType;
};

export const HeaderBanner: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  console.log('slides', slides);

  if (slides.length === 0) return null;
  return (
    <section className={css.section}>
      <Container>
        <div className={css.embla}>
          <div
            className={css.emblaViewport}
            ref={emblaRef}
          >
            <div className={css.emblaContainer}>
              {slides.map((obj, index) => (
                <div
                  className={css.emblaSlide}
                  key={obj.id}
                >
                  <div className={css.emblaSlideNumber}>
                    <Link
                      href={obj.href}
                      className={css.emblaSlideLink}
                    >
                      <picture className={css.emblaSlideLink}>
                        <source
                          srcSet={obj.desktop}
                          type="image/webp"
                          media="(min-width: 1024px)"
                          width={obj.width}
                          height={obj.height}
                        />
                        <source
                          srcSet={obj.tablet}
                          type="image/webp"
                          media="(min-width: 479px)"
                          width={1024}
                          height={428}
                        />
                        <source
                          srcSet={obj.mobile}
                          type="image/webp"
                          media="(min-width: 360px)"
                          width={460}
                          height={460}
                        />
                        <Image
                          src={obj.mobile}
                          width={460}
                          height={460}
                          quality={75}
                          alt={obj.alt}
                          blurDataURL={obj.base64}
                          placeholder="blur"
                          priority={index === 0 ? true : false}
                          // priority
                        />
                      </picture>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className={css.emblaControls}> */}
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

          <div className={css.emblaDots}>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`${css.emblaDot}`.concat(
                  index === selectedIndex ? ` ${css.emblaDotSelected}` : ''
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
