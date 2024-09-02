import { MainLink } from '@/components/shared';
import css from './profileControls.module.scss';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface IProps {
  className?: string;
}

export const ProfileControls = ({ className }: IProps) => {
  const { data: session, status } = useSession();

  if (session && session.user.role === 'USER') {
    return (
      <MainLink
        mode="link"
        to={'/profile'}
        version="text"
      >
        {session.user.image ? (
          <Image
            width={24}
            height={24}
            className={css.avatar}
            src={session.user.image}
            alt={session.user.name}
          />
        ) : (
          <Image
            width={24}
            height={24}
            className={css.avatar}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjZjZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PHBhdGggZD0iTTcgMjAuNjYyVjE5YTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjEuNjYyIi8+PC9zdmc+"
            alt={'user avatar'}
          />
        )}
      </MainLink>
    );
  }
  return (
    // <div className={css.navButtons}>
    <MainLink
      mode="button"
      to={'/login'}
      version="contain"
    >
      Sign in
    </MainLink>
  );
};
