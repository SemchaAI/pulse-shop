import css from './tag.module.scss';

interface IProps {
  // props of memory or arm or color +disabled
  tagId: number;
  name: string;
  disabled?: boolean;
  active: boolean;
  clickHandler: (id: number) => void;
}

export const Tag = ({
  tagId,
  name,
  disabled,
  active,
  clickHandler,
}: IProps) => {
  return (
    <li className={`${disabled ? `${css.disabled}` : ''}`}>
      <button
        className={`
          ${css.tag}
          ${active ? `${css.active}` : ''}
          ${disabled ? `${css.disabled}` : ''}
          `}
        disabled={disabled}
        onClick={() => clickHandler(tagId)}
      >
        {name}
      </button>
    </li>
  );
};
