'use client';
import { EmblaOptionsType } from 'embla-carousel';
import {
  DotButton,
  useDotButton,
} from '@/components/features/CarouselControls/DotButtons';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from '@/components/features/CarouselControls/ArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';

import css from './headerBanner.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared';

type PropType = {
  slides: {
    id: number;
    imgSrc: {
      desktop: string;
      tablet: string;
      mobile: string;
    };
    base64: string;
    alt: string;
    width: number;
    height: number;
    href: string;
  }[];
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

  return (
    <section className={css.section}>
      <Container>
        <div className={css.embla}>
          <div
            className={css.emblaViewport}
            ref={emblaRef}
          >
            <div className={css.emblaContainer}>
              {slides.map((obj) => (
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
                          srcSet={obj.imgSrc.desktop}
                          type="image/webp"
                          media="(min-width: 1024px)"
                          width={obj.width}
                          height={obj.height}
                        />
                        <source
                          srcSet={obj.imgSrc.tablet}
                          type="image/webp"
                          media="(min-width: 479px)"
                          width={1024}
                          height={428}
                        />
                        <source
                          srcSet={obj.imgSrc.mobile}
                          type="image/webp"
                          media="(min-width: 360px)"
                          width={460}
                          height={460}
                        />
                        <Image
                          src={obj.imgSrc.mobile}
                          width={460}
                          height={460}
                          quality={75}
                          alt={obj.alt}
                          blurDataURL={obj.base64}
                          placeholder="blur"
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
