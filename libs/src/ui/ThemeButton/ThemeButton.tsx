import { ETheme, useThemeStore } from '@nx-mfe-template/toolbox';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export const ThemeButton = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeToggle = () => {
    setTheme(theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={handleThemeToggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-primary bg-linear-to-br from-brand-primary/10 to-brand-primary/5 hover:from-brand-primary/20 hover:to-brand-primary/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand-primary/20 hover:scale-110"
      title="Opciones de usuario"
    >
      {theme === ETheme.LIGHT ? <Sun /> : <Moon />}
    </button>
  );
};
