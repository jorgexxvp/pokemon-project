// SCHEMAS

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonType {
  type: { name: string };
}

export interface PokemonAbility {
  ability: { name: string };
}

export interface IDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

// REQUEST

// RESPONSE

export interface IGetDetailResponse {
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
