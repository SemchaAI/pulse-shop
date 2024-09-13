'use client';
import { ChangeEvent, memo, useEffect, useRef } from 'react';

import css from './rangeSlider.module.scss';

type TProps = {
  max: number;
  min: number;
  onChange?: (value: number[]) => void;
  step: number;
  // value: number[];
  minValue: number;
  maxValue: number;
};

const RangeSliderComponent = ({
  max,
  min,
  onChange,
  step,
  minValue,
  maxValue,
}: TProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const zIndexMin = '100';
  const zIndexMax = '200';

  useEffect(() => {
    if (trackRef && trackRef.current) {
      const minLeft = `${((minValue - min) / (max - min)) * 100}%`;
      const maxRight = `${((max - maxValue) / (max - min)) * 100}%`;
      trackRef.current.style.left = minLeft;
      trackRef.current.style.right = maxRight;
    }
  }, [max, maxValue, min, minValue]);

  const handleChangeMin = (event?: ChangeEvent<HTMLInputElement>) => {
    if (
      minInputRef &&
      minInputRef.current &&
      maxInputRef &&
      maxInputRef.current
    ) {
      minInputRef.current.style.zIndex = zIndexMax;
      maxInputRef.current.style.zIndex = zIndexMin;
    }

    const value = Number(event?.target.value);
    if (value <= maxValue) {
      onChange?.([value, maxValue]);
    }
  };

  const handleChangeMax = (event?: ChangeEvent<HTMLInputElement>) => {
    if (
      minInputRef &&
      minInputRef.current &&
      maxInputRef &&
      maxInputRef.current
    ) {
      minInputRef.current.style.zIndex = zIndexMin;
      maxInputRef.current.style.zIndex = zIndexMax;
    }

    const value = Number(event?.target.value);
    if (value >= minValue) {
      onChange?.([minValue, value]);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.rangeSlider}>
        <div
          className={css.track}
          ref={trackRef}
        ></div>
        <input
          className={`${css.input}`}
          max={max}
          min={min}
          name="min"
          onChange={handleChangeMin}
          ref={minInputRef}
          step={step}
          type="range"
          value={minValue}
          aria-label="min"
        />
        <input
          className={`${css.input}`}
          max={max}
          min={min}
          name="max"
          onChange={handleChangeMax}
          ref={maxInputRef}
          step={step}
          type="range"
          value={maxValue}
          aria-label="max"
        />
      </div>
    </div>
  );
};

export const RangeSlider = memo(RangeSliderComponent);
