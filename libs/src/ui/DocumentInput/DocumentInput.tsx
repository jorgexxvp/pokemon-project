import { type FC } from "react";
import type { FieldValues } from "react-hook-form";

interface DocumentInputProps {
  hookform: FieldValues;
  selectName: string;
  inputName: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}

export const DocumentInput: FC<DocumentInputProps> = ({
  hookform,
  selectName,
  inputName,
  label,
  options,
  placeholder = "Número de documento",
  error,
}) => {
  return (
    <div className="space-y-2 w-full gap-1 flex flex-col">
      <label className="text-[16px] font-medium text-(--color-on-surface-variant) px-1">
        {label}
      </label>
      <div
        className={`
        flex items-center overflow-hidden rounded-lg border transition-all    
        bg-(--color-background)
        ${error ? "border-red-500/50" : "border-(--color-outline-variant) focus-within:border-(--color-primary) focus-within:ring-1 focus-within:ring-(--color-primary)"}
      `}
      >
        <Select hookform={hookform} options={options} selectName={selectName} />

        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none py-3 px-4 text-sm text-(--color-on-surface) placeholder:text-(--color-outline)/50 focus:ring-0"
          {...hookform.register(inputName)}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 font-bold text-start">{error}</p>
      )}
    </div>
  );
};

interface SelectProps {
  hookform: FieldValues;
  selectName: string;
  options: { label: string; value: string }[];
  className?: string;
  error?: string;
  selectTitle?: string;
  label?: string;
}

export const Select: FC<SelectProps> = ({
  hookform,
  selectName,
  options,
  className,
  error,
  label,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[16px] font-medium text-(--color-on-surface-variant) px-1">
          {label}
        </label>
      )}
      <select
        {...hookform.register(selectName)}
        className={`text-(--color-on-surface) focus:ring-0 cursor-pointer ${className ? className : "border-r border-white/10 bg-transparent border-none w-32 text-[10.5px] py-1 pl-1 pr-3"}`}
        style={{
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1em",
        }}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-(--color-surface-container-low)"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-500 font-bold text-start">{error}</p>
      )}
    </div>
  );
};
