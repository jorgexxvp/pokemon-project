import type { FC, ReactNode } from 'react';
import { Header } from '../../Header';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const LayoutAdmin: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-(--color-bg-primary) min-h-screen flex flex-col text-(--color-text-primary) relative overflow-hidden ${className}`}
    >
      <Header />
      {children}
    </div>
  );
};
