import Image from 'next/image';
import css from './productCarousel.module.scss';

type PropType = {
  url: string;
  selected: boolean;
  img: string;
  onClick: () => void;
};

export const Thumbnail: React.FC<PropType> = (props) => {
  const { selected, img, onClick, url } = props;

  return (
    <div
      className={`${css.emblaThumbsSlide}`.concat(
        selected ? ` ${css.thumbsSlideSelected}` : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className={css.thumbsSlideNumber}
      >
        <Image
          // className={css.productSwiperSlideImg2}
          priority={true}
          width="150"
          height="150"
          src={url + '/' + img}
          // alt={product.title}
          alt="product image"
        />
      </button>
    </div>
  );
};
