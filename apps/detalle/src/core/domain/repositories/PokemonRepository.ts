import type { IGetDetailResponse } from '../models/Pokemon';

export interface PokemonRepository {
  getPokemonDetail: (id: number) => Promise<IGetDetailResponse>;
}
