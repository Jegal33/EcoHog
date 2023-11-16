import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor() { }

  getPokemon(pokemonName: string) {
    const url = `${this.apiUrl}/pokemon/${pokemonName}`;
    return axios.get(url).then(response => {
      return response.data.sprites.front_default;
    });
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return this.getPokemon(randomId.toString());
  }
}
