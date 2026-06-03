import { PokemonApi } from './infraestructure/PokemonApi';
import { PokemonUseCase } from './application/PokemonUseCase';
import { API_URL } from '@nx-mfe-template/toolbox';

// Repositories
const pokemonApi = new PokemonApi({ baseURL: API_URL });

// Client

export const clientPokemonApi = new PokemonUseCase(pokemonApi);
