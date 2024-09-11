'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Eye, X } from 'lucide-react';
import { useDebounce } from 'react-use';

import { api } from '@/services/api/baseApi';
import { Input } from '@/components/shared/input/Input';

import { useScrollControl } from '@/utils/hooks';
import type { ISearchProduct } from '@/services/productsApi';

import css from './search.module.scss';
import { Star } from '@/components/shared';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<ISearchProduct[]>([]);

  useDebounce(
    () => {
      if (!focused) return;
      const search = async () => {
        try {
          const data = await api.products.search(query);
          // console.log('data', data, focused);
          setProducts(data);
        } catch (error) {
          toast.error('Search error');
          console.log('[SEARCH ERROR]', error);
        }
      };
      search();
    },
    500,
    [query, focused]
  );
  useScrollControl(focused);
  // const ref = useRef(null);
  // useClickAway(ref, () => {
  //   setFocused(false);
  //   setQuery('');
  //   setProducts([]);
  // });

  // useEffect(() => {
  //   if (!focused) return;
  //   let filterTimeout = setTimeout(() => {
  //     api.products
  //       .search(query)
  //       .then((data) => {
  //         setProducts(data);
  //       })
  //       .catch((e) => console.log(e));
  //   }, 500);
  //   return () => {
  //     clearTimeout(filterTimeout);
  //   };
  // }, [query, focused]);

  const RefreshClick = () => {
    setFocused(false);
    setQuery('');
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div
          className={css.focused}
          onClick={RefreshClick}
        />
      )}
      <div
        // ref={ref}
        className={css.searchBlock}
      >
        {/* <div className={css.container}> */}
        <Input
          error="never"
          myType="text"
          className={css.input}
          onFocus={() => setFocused(true)}
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <X
            className={`${css.icon} ${css.closeIcon}`}
            onClick={() => setQuery('')}
          />
        ) : (
          <Eye className={css.icon} />
        )}
        {products.length > 0 && focused && (
          <ul className={`${css.searchList} fadeIn`}>
            {products.map((productItem) => (
              <li
                className={css.searchItem}
                key={productItem.id}
              >
                <Link
                  className={css.searchLink}
                  href={`/product/${productItem.product.id}/${productItem.id}`}
                  onClick={RefreshClick}
                >
                  <div className={css.searchInfo}>
                    <Image
                      className={css.img}
                      src={
                        process.env.NEXT_PUBLIC_IMAGES_HOST + productItem.img
                      }
                      alt={productItem.title}
                      width={100}
                      height={100}
                    />
                    <p className={css.rating}>
                      {productItem.product.totalRating.toPrecision(2)}
                      <Star
                        className="full"
                        width={20}
                        height={20}
                      />
                    </p>
                    <h3 className={css.title}>{productItem.title}</h3>
                  </div>
                  <div className={css.dashedLine} />
                  <p className={css.price}>{productItem.price} MDL</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {/* </div> */}
      </div>
    </>
  );
};
