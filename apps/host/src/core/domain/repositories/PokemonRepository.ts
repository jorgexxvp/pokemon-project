import type {
  IAllPokemonRequest,
  IDetailCategory,
  IGetCategoryRequest,
} from '../models/Pokemon';

export interface PokemonRepository {
  getPokemonCategory: (
    params: IGetCategoryRequest,
  ) => Promise<IDetailCategory[]>;
  getAllPokemon: (params: IAllPokemonRequest) => Promise<IDetailCategory[]>;
}
