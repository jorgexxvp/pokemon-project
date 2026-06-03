import { X } from 'lucide-react';
import { FC, useState } from 'react';

interface ToastProps {
  description: string;
  imageUrl?: string;
}

export const Toast: FC<ToastProps> = ({ description, imageUrl }) => {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <div className="fixed bottom-6 bg-(--color-bg-primary) right-6 z-50 flex items-center p-3 rounded-xl shadow-2xl w-64 max-w-full">
        <div className="shrink-0 w-16 h-12 glass-card rounded-md overflow-hidden flex items-center justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Último Pokémon"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div className="ml-3 mr-4 text-sm font-semibold text-on-surface leading-tight">
          <p className="capitalize">Ultimo Pokemon Visitado: {description}</p>
        </div>

        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="absolute top-2 right-2 text-on-surface hover:text-on-surface transition-colors"
          aria-label="Cerrar notificación"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    )
  );
};
