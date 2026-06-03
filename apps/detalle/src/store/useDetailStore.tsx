import { IResponse, ResponseType } from '@nx-mfe-template/toolbox';
import { create } from 'zustand';
import { clientPokemonApi } from '../core';

export interface IData {
  id: number;
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
}

export interface IDetailStore {
  dataDetail: IData | null;
  fetchDetail: (id: number) => void;
  response: IResponse;
}

export const useDetailStore = create<IDetailStore>()((set) => ({
  dataDetail: null,
  response: { message: '', type: ResponseType.INITIAL },
  fetchDetail: async (id) => {
    set({
      response: {
        message: 'Cargando...',
        type: ResponseType.LOADING,
      },
    });

    try {
      const response = await clientPokemonApi.getPokemonDetail(id);

      set({
        dataDetail: response,
        response: {
          message: 'Detalle cargado',
          type: ResponseType.SUCCESS,
        },
      });
    } catch (error) {
      const errorMessage = 'error';

      set({
        response: {
          message: `Error al cargar: ${errorMessage}`,
          type: ResponseType.ERROR,
        },
      });
    }
  },
}));
