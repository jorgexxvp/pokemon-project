import { FC } from 'react';
import { FieldValues } from 'react-hook-form';

interface SelectType {
  data: { name: string; id: number }[];
  hookform: FieldValues;
  name: string;
  text: string;
}

export const CustomSelect: FC<SelectType> = ({
  data,
  hookform,
  name,
  text,
}) => {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-text-primary mb-2">
        {text}
      </label>
      <select
        {...hookform.register(name)}
        className="w-full p-3 rounded-lg border border-(--color-border-primary) 
                   bg-(--color-bg-input) text-(--color-text-primary) 
                   focus:ring-2 focus:ring-brand-primary outline-none transition-all"
      >
        <option value="">-- Seleccionar --</option>
        {data.map((type) => (
          <option key={type.id} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
