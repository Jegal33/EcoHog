import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private utilSvc: UtilsService) { }

  ngOnInit() {
  }


    // Obtener datos del usuario del almacenamiento local
    user(): User{
      return this.utilSvc.getFromLocalStorage('user');
    }

}
