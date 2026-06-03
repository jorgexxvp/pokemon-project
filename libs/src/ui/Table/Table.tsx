import type React from "react";
import { Fragment, type FC, type ReactNode } from "react";

interface TableProps<T> {
  title: string[];
  data: T[];
  render: (item: T) => React.ReactNode;
}

export const Table = <T,>({ title, data, render }: TableProps<T>) => {
  return (
    <div className="overflow-hidden rounded-xl border border-(--color-border-soft) bg-(--color-bg-card)">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-(--color-border-soft) bg-white/2">
            {title.map((t, index) => (
              <th
                key={index}
                className="px-6 py-4 text-xs font-bold uppercase text-(--color-text-muted) last:w-7.5 last:justify-center"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border-soft)">
          {data.map((item, index) => (
            <Fragment key={index}>{render(item)}</Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ColumnsTableProps {
  text?: string;
  icon?: React.JSX.Element;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export const ColumnsTable: FC<ColumnsTableProps> = ({
  text,
  icon,
  onClick,
  className,
  children,
}) => {
  return (
    <td className="px-6 py-4">
      <span
        className={`flex items-center gap-2 text-sm ${onClick ? "cursor-pointer hover:text-white" : ""} ${className || ""}`}
        onClick={onClick}
      >
        {icon}
        {text}
        {children}
      </span>
    </td>
  );
};
