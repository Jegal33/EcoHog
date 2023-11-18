import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  pokemon = {
    name: '',
    spriteUrl: ''
  };

  constructor(private utilSvc: UtilsService, private pokemonService: PokemonService, private firebaseSvc: FirebaseService) { }

  ngOnInit() {
  }

  // Cierra sesión
  signOut(){
    this.firebaseSvc.signOut()
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

  ionViewDidEnter() {
    this.getPokemonSprite();
  }

  async SelectionMode() {
    this.utilSvc.presentAlert({
      header: 'Selecciona el tema',
      buttons: ['Ok'],
      inputs: [{
        label: 'Predeterminado',
        type: 'radio',
        handler: () => {
          console.log('Predeterminado');
        }
      }, {
        label: 'Claro',
        type: 'radio',
        handler: () => {
          console.log('Claro');
        }
      }, {
        label: 'Oscuro',
        type: 'radio',
        handler: () => {
          console.log('Oscuro');
        }
      }]
    });
  
  }



}
