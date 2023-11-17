import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Configuración', url: 'home', icon: 'settings-outline' },
    { title: 'Ayuda', url: 'home', icon: 'help-circle-outline' }
  ]

  pokemon = {
    name: '',
    spriteUrl: ''
  };


  constructor(private utilSvc: UtilsService, private pokemonService: PokemonService) { }

  ngOnInit() {
  }


    // Obtener datos del usuario del almacenamiento local
    user(): User{
      return this.utilSvc.getFromLocalStorage('user');
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
