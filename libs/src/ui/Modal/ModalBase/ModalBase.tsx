import { X } from 'lucide-react';
import type { FC } from 'react';

interface ModalBaseProps {
  children: React.ReactNode;
  setOpen: (value: boolean) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const ModalBase: FC<ModalBaseProps> = ({
  children,
  setOpen,
  className = 'max-w-3/4 w-full',
  title,
  subtitle,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-(--color-bg-primary)/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={() => setOpen(false)}
      />

      <main
        className={`
          relative z-10 w-full transition-all duration-300 ease-out
          |bg-[var(--color-surface-container-low)]
          border border-(--color-border-soft) rounded-xl 
          shadow-[0px_20px_50px_rgba(0,0,0,0.5)]
          max-h-[90vh] flex flex-col
          min-w-[320px] 
          ${className}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-2 text-(--color-outline) hover:text-(--color-on-surface) hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all z-20"
        >
          <X size={20} />
        </button>

        {(title || subtitle) && (
          <header className="p-6 pb-2 space-y-1">
            {title && (
              <h1 className="text-xl font-semibold text-[--color-on-surface]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-(--color-on-surface-variant)">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
          <div className="text-(--color-on-surface)">{children}</div>
        </div>
      </main>
    </div>
  );
};
