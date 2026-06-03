import { Eye, EyeOff } from 'lucide-react';
import { useState, type FC, type InputHTMLAttributes, type JSX } from 'react';
import type { FieldValues } from 'react-hook-form';

interface IInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  methods: FieldValues;
  name: string;
  icon?: JSX.Element;
  textArea?: boolean;
  rows?: number;
  error?: string;
}

export const InputText: FC<IInputTextProps> = ({
  label,
  methods,
  name,
  icon,
  textArea = false,
  rows = 4,
  error,
  ...rest
}) => {
  const validation = rest.type === 'password';
  const [showText, setShowText] = useState(validation ? false : true);

  return (
    <div className="flex flex-col gap-2">
      <p>{label}</p>

      {textArea ? (
        <textarea id={name} rows={rows} {...methods.register(name)} {...rest} />
      ) : (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            className="w-full bg-(--color-bg-input) border border-(--color-border-primary) rounded-lg py-3 pl-11 pr-12 
             text-(--color-text-primary) placeholder:text-(--color-text-muted)
             focus:outline-none focus:ring-2 focus:ring-(--color-brand-primary)/50 
             focus:border-(--color-brand-primary) 
             autofill:bg-(--color-bg-input) 
             transition-all"
            {...methods.register(name)}
            {...rest}
            type={showText ? 'text' : 'password'}
          />
          {validation && (
            <button
              type="button"
              onClick={() => setShowText(!showText)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-(--color-text-muted) hover:text-white transition-colors"
            >
              {showText ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      )}
      {error && (
        <p className="text-sm text-red-500 font-bold text-start">{error}</p>
      )}
    </div>
  );
};
