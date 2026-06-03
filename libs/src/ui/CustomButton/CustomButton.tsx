import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, FC, JSX } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  loading?: boolean;
  icon?: JSX.Element;
}

export const CustomButton: FC<IconButtonProps> = ({
  text,
  onClick,
  loading,
  icon,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`align-middle bg-(--color-brand-primary) hover:bg-(--color-brand-hover) text-(--color-brand-dark) font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-(--color-brand-primary)/10 ${rest.className ? rest.className : 'w-full'}`}
    >
      {loading && <LoaderCircle className="animate-spin" />}
      {icon && icon}
      {text && text}
    </button>
  );
};
