import { Component, Input } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pokemon = {
    name: '',
    spriteUrl: ''
  };

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getPokemonSprite();
  }

  //Metodo para obtener el sprite
  getPokemonSprite() {
    this.pokemonService.getRandomPokemon().then(spriteUrl => {
      this.pokemon = {
        name: null,
        spriteUrl: spriteUrl
      };
    });
  }

  //Metodo para actualizar al sprite
  updatePokemonSprite() {
    console.log('Actualizando imagen del Pokémon...');
    this.pokemonService.getRandomPokemon().then(spriteUrl => {
      this.pokemon = {
        name: null,
        spriteUrl: spriteUrl
      };
    });
  }
}
