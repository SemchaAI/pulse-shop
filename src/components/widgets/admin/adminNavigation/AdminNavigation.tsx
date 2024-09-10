import { Container, MainLink } from '@/components/shared';
import css from './adminNavigation.module.scss';

interface IProps {
  className?: string;
}

const adminPages = [
  'Categories',
  'Products',
  'Banner',
  'Colors',
  'Memory',
  'Ram',
  'Product',
  'Item',
];

export const AdminNavigation = ({}: IProps) => {
  return (
    <nav className={css.adminNav}>
      <Container>
        <ul className={css.adminList}>
          {adminPages.map((page) => (
            <li
              className={css.adminItem}
              key={page}
            >
              <MainLink
                mode="button"
                version="contain"
                to={`/admin/${page.toLowerCase()}`}
              >
                {page}
              </MainLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};
