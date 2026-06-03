import { PrivateApi } from '@nx-mfe-template/toolbox';
import { PokemonRepository } from '../domain/repositories/PokemonRepository';
import {
  IAllPokemon,
  IAllPokemonRequest,
  ICategoryResponse,
  IGetCategoryRequest,
  PokemonDetail,
  PokemonStat,
} from '../domain/models/Pokemon';

const getStat = (stats: PokemonStat[], name: string): number =>
  stats.find((s) => s.stat.name === name)?.base_stat ?? 0;

export class PokemonApi extends PrivateApi implements PokemonRepository {
  public getPokemonCategory = async (params: IGetCategoryRequest) => {
    const response = await this.get<ICategoryResponse>('/type/' + params.type);

    const firstTen = response.data.pokemon.slice(0, params.limit);

    const detailedData = await Promise.all(
      firstTen.map(async (item) => {
        const detail = await this.get<PokemonDetail>(item.pokemon.url);
        const p = detail.data;

        return {
          name: p.name,
          image: p.sprites.other['official-artwork'].front_default,
          hp: getStat(p.stats, 'hp'),
          attack: getStat(p.stats, 'attack'),
          defense: getStat(p.stats, 'defense'),
          types: p.types.map((t) => t.type.name),
          id: p.id,
        };
      }),
    );

    return detailedData;
  };

  public getAllPokemon = async (params: IAllPokemonRequest) => {
    const response = await this.get<IAllPokemon>(
      `/pokemon?limit=${params.limit}&offset=${params.offset}`,
    );

    const detailedData = await Promise.all(
      response.data.results.map(async (item) => {
        const detail = await this.get<PokemonDetail>(item.url);
        const p = detail.data;
        return {
          name: p.name,
          image: p.sprites.other['official-artwork'].front_default,
          hp: getStat(p.stats, 'hp'),
          attack: getStat(p.stats, 'attack'),
          defense: getStat(p.stats, 'defense'),
          types: p.types.map((t) => t.type.name),
          id: p.id,
        };
      }),
    );

    return detailedData;
  };

  public getPokemon = async (name: string) => {
    const response = await this.get<PokemonDetail>(`/pokemon/${name}`);
    const p = response.data;

    return {
      name: p.name,
      image: p.sprites.other['official-artwork'].front_default,
      hp: getStat(p.stats, 'hp'),
      attack: getStat(p.stats, 'attack'),
      defense: getStat(p.stats, 'defense'),
      types: p.types.map((t) => t.type.name),
      id: p.id,
    };
  };
}
