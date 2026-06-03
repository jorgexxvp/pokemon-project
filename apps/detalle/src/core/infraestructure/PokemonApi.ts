import { PrivateApi } from '@nx-mfe-template/toolbox';
import { PokemonRepository } from '../domain/repositories/PokemonRepository';
import { IDetail, PokemonStat } from '../domain/models/Pokemon';

const getStat = (stats: PokemonStat[], name: string): number =>
  stats.find((s) => s.stat.name === name)?.base_stat || 0;

export class PokemonApi extends PrivateApi implements PokemonRepository {
  public getPokemonDetail = async (id: number) => {
    const { data: p } = await this.get<IDetail>('pokemon/' + id);

    return {
      id: p.id,
      name: p.name,
      image: p.sprites.other['official-artwork'].front_default,
      hp: getStat(p.stats, 'hp'),
      attack: getStat(p.stats, 'attack'),
      defense: getStat(p.stats, 'defense'),
      specialAttack: getStat(p.stats, 'special-attack'),
      specialDefense: getStat(p.stats, 'special-defense'),
      speed: getStat(p.stats, 'speed'),
      types: p.types.map((t) => t.type.name),
      abilities: p.abilities.map((a) => a.ability.name),
      height: p.height,
      weight: p.weight,
    };
  };
}
