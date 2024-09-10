'use client';
import type { Category, Product, ProductItem } from '@prisma/client';
import css from './adminSearch.module.scss';
import { useState } from 'react';
import { Input } from '@/components/shared';
import { Copy, Eye, X } from 'lucide-react';
import Image from 'next/image';
import { useDebounce } from 'react-use';

interface ISearchProduct extends Product {
  category: Category;
  productItem: ProductItem[];
}
interface IProps {
  products: ISearchProduct[];
}

export const AdminSearch = ({ products }: IProps) => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(products);

  useDebounce(
    () => {
      setData(
        products.filter(function (item) {
          if (
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.productItem[0]?.title
              .toLowerCase()
              .includes(query.toLowerCase())
          )
            return true;
          return false;
        })
      );
    },
    500,
    [query]
  );

  return (
    <div className={css.searchBlock}>
      <h3 className={css.searchBlockTitle}>Search Products</h3>
      <div className={css.inputBlock}>
        <Input
          error="never"
          myType="text"
          className={css.input}
          placeholder="Search product Id. Min 3 letters"
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
      </div>
      {data.length > 0 && query.length >= 3 ? (
        <ul className={`${css.searchList} fadeIn`}>
          {data.map(
            (product) =>
              product.productItem.length > 0 ? (
                product.productItem.map((item) => (
                  <li
                    className={css.searchItem}
                    key={item.id}
                  >
                    <div
                      key={item.id}
                      className={css.searchInfo}
                    >
                      <Image
                        className={css.img}
                        src={process.env.NEXT_PUBLIC_IMAGES_HOST + item.img}
                        alt={item.title}
                        width={200}
                        height={200}
                      />
                      <h3 className={css.title}>{item.title}</h3>
                      <p className={css.price}>{product.category.name}</p>
                      <p className={css.itemId}>
                        Product Item ID :{item.id}
                        <Copy
                          size={20}
                          onClick={() =>
                            navigator.clipboard.writeText(item.id.toString())
                          }
                        />
                      </p>
                      <Copy
                        className={css.copy}
                        size={20}
                        onClick={() =>
                          navigator.clipboard.writeText(product.id.toString())
                        }
                      />
                    </div>
                  </li>
                ))
              ) : (
                <h3
                  key={product.id}
                  className={css.title}
                >
                  No items
                </h3>
              )

            // <li
            //   className={css.searchItem}
            //   key={product.id}
            // >
            //   {product.productItem[0] ? (
            //     product.productItem.map((item) => (
            //       <div
            //         key={item.id}
            //         className={css.searchInfo}
            //       >
            //         <Image
            //           className={css.img}
            //           src={process.env.NEXT_PUBLIC_IMAGES_HOST + item.img}
            //           alt={item.title}
            //           width={200}
            //           height={200}
            //         />
            //         <h3 className={css.title}>{item.title}</h3>
            //         <p className={css.price}>{product.category.name}</p>
            //         <Copy
            //           className={css.copy}
            //           size={20}
            //           onClick={() =>
            //             navigator.clipboard.writeText(product.id.toString())
            //           }
            //         />
            //       </div>
            //     ))
            //   ) : (
            //     <h3 className={css.title}>No items</h3>
            //   )}
            // </li>
          )}
        </ul>
      ) : (
        <div className={css.skeleton}> No data</div>
      )}
      {/* </div> */}
    </div>
  );
};
