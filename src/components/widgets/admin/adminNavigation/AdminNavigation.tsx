import { Container, MainLink } from '@/components/shared';
import css from './adminNavigation.module.scss';
import { folderPaths } from '@/utils/helpers/nextPath';

interface IProps {
  className?: string;
}

const adminPages = [
  'Categories',
  'Banner',
  'Colors',
  'Memory',
  'Ram',
  'Product',
  'Item',
];

export const AdminNavigation = ({}: IProps) => {
  const nav = folderPaths('src/app/(admin)/admin/');

  return (
    <nav className={css.adminNav}>
      <Container>
        <ul className={css.adminList}>
          {nav.map((page) => (
            <li
              className={css.adminItem}
              key={page}
            >
              <MainLink
                mode="button"
                version="contain"
                to={`/admin/${page}`}
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
