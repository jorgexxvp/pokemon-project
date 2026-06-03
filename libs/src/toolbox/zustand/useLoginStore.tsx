import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IResponse } from '../interface';
import { ResponseType, ROUTE_HOME } from '../constants';

export interface IAuthParams {
  name: string;
  password: string;
}

export interface ILoginStore {
  rol: string | null;
  name: string | null;
  response: IResponse;
  fetchAuth: (params: IAuthParams) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useLoginStore = create<ILoginStore>()(
  persist(
    (set) => ({
      clearAuth: () =>
        set({
          rol: null,
          name: '',
        }),
      rol: null,
      name: null,
      response: { message: '', type: ResponseType.INITIAL },
      fetchAuth: async (params) => {
        set({
          response: {
            message: 'Cargando...',
            type: ResponseType.LOADING,
          },
        });

        setTimeout(() => {
          set({
            rol: 'Usuario',
            name: params.name,
            response: {
              message: 'Autenticación exitosa',
              type: ResponseType.SUCCESS,
            },
          });

          window.location.href = ROUTE_HOME;
        }, 2000);
      },

      logout: () => {
        set({
          rol: null,
          response: { message: '', type: ResponseType.INITIAL },
        });
        window.location.href = '/';
      },
    }),

    {
      name: 'auth-storage',
      partialize: (state) => ({
        rol: state.rol,
        name: state.name,
      }),
    },
  ),
);
