import { Eye, X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';

interface ToastProps {
  description: string;
  imageUrl?: string;
  /** Tiempo en ms antes de cerrarse solo. 0 = no se cierra automáticamente. */
  duration?: number;
}

export const Toast: FC<ToastProps> = ({
  description,
  imageUrl,
  duration = 30000,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => setOpen(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!open) return null;

  return (
    <div
      role="status"
      className="animate-toast-in fixed bottom-6 right-6 z-50 flex items-center gap-3 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl bg-(--color-bg-primary)/95 backdrop-blur-xl pl-4 pr-9 py-3 shadow-2xl ring-1 ring-white/10"
    >
      <span className="absolute left-0 top-0 h-full w-1 bg-(--color-primary)" />

      <div className="relative shrink-0 w-14 h-14 rounded-xl glass-card flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-(--color-primary)/10 blur-md" />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={description}
            className="relative z-10 w-full h-full object-contain drop-shadow"
          />
        )}
      </div>

      <div className="min-w-0">
        <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-(--color-primary)">
          <Eye size={12} strokeWidth={2.5} />
          Último visitado
        </p>
        <p className="capitalize truncate text-sm font-semibold text-on-surface leading-tight">
          {description}
        </p>
      </div>

      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full text-on-surface/60 hover:text-on-surface hover:bg-white/10 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
};
