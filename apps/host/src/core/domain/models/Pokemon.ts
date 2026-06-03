// SCHEMAS

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonDetail {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  id: number;
  stats: PokemonStat[];
  types: PokemonType[];
}

// REQUEST

export interface IGetCategoryRequest {
  type: string;
  limit: number;
}

export interface IAllPokemonRequest {
  limit: number;
  offset: number;
}

// RESPONSE

export interface IAllPokemon {
  results: { url: string }[];
}

export interface ICategoryResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
  name: string;
}

export interface IDetailCategory {
  name: string;
  image: string;
  hp: number;
  defense: number;
  types: string[];
  attack: number;
  id: number;
}
