import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IData {
  name: string;
  image: string;
  hp: number;
  defense: number;
  types: string[];
  attack: number;
  id: number;
}

export interface IHistoryStore {
  historial: IData[] | null;
  addToHistorial: (data: IData) => void;
  clearCache: () => void;
}

export const useHistoryStore = create<IHistoryStore>()(
  persist(
    (set) => ({
      addToHistorial: (data: IData) =>
        set((state) => {
          const filteredHistorial = (state.historial || []).filter(
            (item) => item.id !== data.id,
          );

          const newHistorial = [data, ...filteredHistorial].slice(0, 10);

          return { historial: newHistorial };
        }),

      historial: null,
      clearCache: () => set({ historial: null }),
    }),
    {
      name: 'historial-storage',
      partialize: (state) => ({
        historial: state.historial,
      }),
    },
  ),
);
