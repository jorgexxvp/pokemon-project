import { IResponse, ResponseType } from '@nx-mfe-template/toolbox';
import { create } from 'zustand';
import { clientPokemonApi } from '../core';

export interface IData {
  name: string;
  image: string;
  hp: number;
  defense: number;
  types: string[];
  attack: number;
  id: number;
}

export interface IHomeStore {
  categoryData: IData[] | null;
  listData: IData[] | null;
  fetchCategoryData: (type: string) => void;
  fetchListData: (
    data: { limit: number; offset: number },
    append: boolean,
  ) => void;
  response: IResponse;
  fetchSearch: (name: string) => void;
  resetListData: () => void;
}

export const useHomeStore = create<IHomeStore>()((set) => ({
  categoryData: null,
  listData: null,
  resetListData: () => set({ listData: null }),
  response: { message: '', type: ResponseType.INITIAL },
  fetchSearch: async (name: string) => {
    set({
      response: {
        message: 'Cargando...',
        type: ResponseType.LOADING,
      },
    });

    try {
      const response = await clientPokemonApi.getPokemon(name);
      set({
        listData: [response],
        response: {
          message: 'Datos cargados exitosamente',
          type: ResponseType.SUCCESS,
        },
      });
    } catch (error) {
      const errorMessage = 'Error al obtener categoría';

      set({
        listData: [],
        response: {
          message: errorMessage,
          type: ResponseType.ERROR,
        },
      });
    }
  },
  fetchCategoryData: async (type: string) => {
    set({
      response: {
        message: 'Cargando...',
        type: ResponseType.LOADING,
      },
    });

    try {
      const response = await clientPokemonApi.getPokemonCategory({
        limit: 10,
        type: type,
      });

      set({
        categoryData: response,
        response: {
          message: 'Datos cargados exitosamente',
          type: ResponseType.SUCCESS,
        },
      });
    } catch (error) {
      const errorMessage = 'Error al obtener categoría';

      set({
        categoryData: [],
        response: {
          message: errorMessage,
          type: ResponseType.ERROR,
        },
      });
    }
  },
  fetchListData: async (data, append = false) => {
    set({
      response: { message: 'Cargando...', type: ResponseType.LOADING },
    });

    try {
      const response = await clientPokemonApi.getAllPokemon(data);

      set((state) => ({
        listData:
          append && state.listData
            ? [...state.listData, ...response]
            : response,
        response: { message: 'Datos cargados', type: ResponseType.SUCCESS },
      }));
    } catch (error) {
      set({ response: { message: 'Error', type: ResponseType.ERROR } });
    }
  },
}));
