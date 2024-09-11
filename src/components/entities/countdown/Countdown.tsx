'use client';
import { useEffect, useRef, useState } from 'react';
import css from './countdown.module.scss';
import { formatTime } from '@/utils/helpers/timeHelper';

interface IProps {
  setIsOver: (isOver: boolean) => void;
  time: number;
}

export const Countdown = ({ setIsOver, time }: IProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [duration, setDuration] = useState<number>(time);

  useEffect(() => {
    // console.log('timeLeft', duration);
    timerRef.current = setInterval(() => {
      setDuration((prevTime) => {
        // console.log('timeLeft', prevTime);
        // If time is up, clear the interval
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        // Decrease the time left by one second
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (duration === 0) {
      // console.log('time is over');
      setIsOver(true);
    }
  }, [duration]);

  return <div className={css.countdown}>{formatTime(duration)}</div>;
};
