import {
  IAllPokemonRequest,
  IGetCategoryRequest,
} from '../domain/models/Pokemon';
import { PokemonRepository } from '../domain/repositories/PokemonRepository';

export class PokemonUseCase {
  private repo: PokemonRepository;

  constructor(repo: PokemonRepository) {
    this.repo = repo;
  }

  public async getPokemonCategory(params: IGetCategoryRequest) {
    return this.repo.getPokemonCategory(params);
  }

  public async getAllPokemon(params: IAllPokemonRequest) {
    return this.repo.getAllPokemon(params);
  }

  public async getPokemon(name: string) {
    return this.repo.getPokemon(name);
  }
}
