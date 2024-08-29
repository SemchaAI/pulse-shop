import { Container } from '@/components/shared';
import css from './mainFooter.module.scss';
export const MainFooter = function MainFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.footerContainer}>
          <p className={css.footerText}>© {year}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
1;
