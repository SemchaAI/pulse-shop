'use client';
import { Container, MainBtn } from '@/components/shared';
import css from './authSection.module.scss';
import { signIn } from 'next-auth/react';
import { Github, Plus } from 'lucide-react';
import { LoginForm, RegisterForm } from '@/components/entities';
import { usePathname } from 'next/navigation';

interface IProps {
  className?: string;
}

export const AuthSection = ({ className }: IProps) => {
  const container = `${className}`;
  const isLogin = usePathname() === '/login';
  const title = isLogin ? 'Sign in' : 'Registration';

  return (
    <section className={container}>
      <Container>
        <div className={css.authContent}>
          <h2 className={css.authTitle}>{title}</h2>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <hr />
          <div className={css.authButtons}>
            <MainBtn
              size="full"
              version="contain"
              label="Sign in with Github"
              onClick={() =>
                signIn('github', { callbackUrl: '/', redirect: true })
              }
            >
              Github <Github />
            </MainBtn>
            <MainBtn
              size="full"
              version="outline"
              label="Sign in with Google"
              onClick={() =>
                signIn('google', { callbackUrl: '/', redirect: true })
              }
            >
              Google <Plus />
            </MainBtn>
          </div>
        </div>
      </Container>
    </section>
  );
};
