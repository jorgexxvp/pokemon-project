import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const LayoutPublic: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-(--color-bg-primary) min-h-screen flex flex-col text-(--color-text-primary) relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
