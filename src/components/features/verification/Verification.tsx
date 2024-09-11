'use client';
import { MainBtn } from '@/components/shared';
import css from './verification.module.scss';
import { useState } from 'react';
import { Countdown } from '@/components/entities';
import { api } from '@/services/api/baseApi';
import toast from 'react-hot-toast';

interface IProps {
  id: string | undefined;
}

export const Verification = ({ id }: IProps) => {
  const [isOver, setIsOver] = useState(false);

  const clickHandler = async () => {
    if (!id) return;
    try {
      await api.user.updateCode({ id: id });
      toast.success('Activation link sent. Please check your email.');
    } catch (error) {
      console.log(error);
      toast.error('Activation link not sent');
    }
  };

  if (!id)
    return (
      <div className={css.verification}>
        <div className={css.verificationContainer}>
          <h3 className={css.verificationTitle}>
            No one user are was registered from this pc
          </h3>
        </div>
      </div>
    );

  return (
    <div className={css.verification}>
      <div className={css.verificationContainer}>
        <h3 className={css.verificationTitle}>User created</h3>
        <p className={css.verificationText}>Please check your email.</p>
        <div className={css.verificationBreak} />
        <p className={css.verificationText}>
          If you did not receive an email in a 5 minutes, please click on the
          button below. Be patient, resend can be done only once.
        </p>
        <Countdown
          setIsOver={setIsOver}
          time={60}
        />
        <MainBtn
          disabled={!isOver}
          size="default"
          version="contain"
          type="button"
          label="Resend activation link"
          onClick={clickHandler}
        >
          Resend activation link
        </MainBtn>
      </div>
    </div>
  );
};
