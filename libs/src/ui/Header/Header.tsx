import { useEffect, useRef, useState } from 'react';
import { CircleUser, Clock, LogOut } from 'lucide-react';
import {
  ROUTE_HISTORY,
  ROUTE_LOGIN,
  URL_HISTORY,
  URL_HOST,
  useHistoryStore,
  useLoginStore,
  useThemeStore,
} from '@nx-mfe-template/toolbox';
import { ThemeButton } from '../ThemeButton';

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rol, name, clearAuth } = useLoginStore();

  const handleLogout = () => {
    clearAuth();
    localStorage.clear();
    sessionStorage.clear();

    const LOGIN_URL = `${URL_HOST}${ROUTE_LOGIN}`;

    window.location.href = LOGIN_URL;

    setIsModalOpen(false);
  };

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-blue-950 px-8 bg-linear-to-r from-surface-container to-surface-container-low">
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-brand-primary">
          Pokedex
        </h1>
        <ThemeButton />
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={() => {
            const historialRaw = useHistoryStore.getState().historial || [];
            const userName = useLoginStore.getState().name || '';
            const rol = useLoginStore.getState().rol || '';
            const theme = useThemeStore.getState().theme || '';

            const jsonString = JSON.stringify(historialRaw);

            const encodedHistorial = btoa(encodeURIComponent(jsonString))
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=+$/, '');

            window.location.href = `${URL_HISTORY}${ROUTE_HISTORY}?user=${encodeURIComponent(userName)}&rol=${encodeURIComponent(rol)}&historial=${encodedHistorial}&theme=${encodeURIComponent(theme)}`;
          }}
          className="flex flex-row gap-3 items-center justify-center cursor-pointer 
                     transition-transform duration-200 ease-in-out 
                     hover:scale-105 active:scale-95"
          title="Opciones de usuario"
        >
          Historial
          <Clock className="h-6 w-6 text-brand-primary" />
        </button>

        <div className="flex items-center gap-4 relative">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-text-primary">{name}</p>
            <p className="text-xs text-text-muted">Rol: {rol}</p>
          </div>

          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-primary bg-linear-to-br from-brand-primary/10 to-brand-primary/5 hover:from-brand-primary/20 hover:to-brand-primary/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand-primary/20 hover:scale-110"
            title="Opciones de usuario"
          >
            <CircleUser className="h-6 w-6 text-brand-primary" />
          </button>

          {isModalOpen && (
            <UserMenu handleLogout={handleLogout} setIsOpen={setIsModalOpen} />
          )}
        </div>
      </div>
    </header>
  );
};

const UserMenu = ({
  handleLogout,
  setIsOpen,
}: {
  handleLogout: () => void;
  setIsOpen: (open: boolean) => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-48 bg-(--color-bg-card) border border-(--color-border-primary) rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-sm text-(--color-text-primary) hover:bg-(--color-bg-input) rounded-lg flex items-center gap-2 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Cerrar Sesión
      </button>
    </div>
  );
};
