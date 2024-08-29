import { MainBtn } from '@/components/shared';
import css from './pagination.module.scss';
import {
  ChevronLeft,
  ChevronLeftSquare,
  ChevronRight,
  ChevronRightSquare,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface IProps {
  totalPages: number;
  currentPage: number;
  pageHandler: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  pageHandler,
}: IProps) => {
  const prevPages = [];
  const nextPages = [];

  for (let i = currentPage; i > 1 && prevPages.length < 2; i--) {
    prevPages.unshift(i - 1);
  }
  for (let i = currentPage; i < totalPages && nextPages.length < 2; i++) {
    nextPages.push(i + 1);
  }
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={css.pagination}>
      <MainBtn
        icon={true}
        version="contain"
        disabled={currentPage === 1}
        onClick={() => pageHandler(1)}
      >
        <ChevronsLeft className={css.arrow} />
      </MainBtn>
      <MainBtn
        icon={true}
        version="contain"
        disabled={currentPage === 1}
        onClick={() => pageHandler(currentPage - 1)}
      >
        <ChevronLeft className={css.arrow} />
      </MainBtn>
      {prevPages.map((page) => (
        <MainBtn
          key={page}
          version="outline"
          onClick={() => pageHandler(page)}
        >
          {page}
        </MainBtn>
      ))}
      <MainBtn version="contain">{currentPage}</MainBtn>
      {nextPages.map((page) => (
        <MainBtn
          key={page}
          version="outline"
          onClick={() => pageHandler(page)}
        >
          {page}
        </MainBtn>
      ))}
      <MainBtn
        icon={true}
        version="contain"
        disabled={currentPage === totalPages}
        onClick={() => pageHandler(currentPage + 1)}
      >
        <ChevronRight className={css.arrow} />
      </MainBtn>
      <MainBtn
        icon={true}
        version="contain"
        disabled={currentPage === totalPages}
        onClick={() => pageHandler(totalPages)}
      >
        <ChevronsRight className={css.arrow} />
      </MainBtn>
    </div>
  );
};
