import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IThemeStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
};

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme',
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);
