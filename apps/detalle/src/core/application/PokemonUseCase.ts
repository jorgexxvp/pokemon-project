import { PokemonRepository } from '../domain/repositories/PokemonRepository';

export class PokemonUseCase {
  private repo: PokemonRepository;

  constructor(repo: PokemonRepository) {
    this.repo = repo;
  }

  public async getPokemonDetail(id: number) {
    return this.repo.getPokemonDetail(id);
  }
}
