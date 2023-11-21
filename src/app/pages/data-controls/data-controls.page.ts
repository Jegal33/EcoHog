import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expenses.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { collection } from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { catchError, finalize, map } from 'rxjs';

@Component({
  selector: 'app-data-controls',
  templateUrl: './data-controls.page.html',
  styleUrls: ['./data-controls.page.scss'],
})
export class DataControlsPage implements OnInit {

  constructor(private firebaseSvc : FirebaseService, private utilsSvc : UtilsService, private angularFire: AngularFirestore) { }

    // Obtiene usuario
    user = {} as User;
   
    ngOnInit() {
      this.user = this.utilsSvc.getFromLocalStorage('user');
  
    }

  // Alerta de eliminar Gastos
  async confirmDeleteExpense() {
    this.utilsSvc.presentAlert({
      //header: 'Confirm!',
      message: '¿Estas seguro de eliminar los datos de gastos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          handler: () => {
            this.deteleteCollection();
          }
        }
      ]
    });
  }

    // Alerta de eliminar Cuenta
    async confirmDeleteAccount() {
      this.utilsSvc.presentAlert({
        //header: 'Confirm!',
        message: '¿Estas seguro de que desea eliminar su cuenta?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Si',
            handler: () => {
              this.deleteUser();
            }
          }
        ]
      });
    }

  deleteUser(){}


  // Eliminar todos los gastos
  async deteleteCollection() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
  
    let path = `users/${this.user.uid}/expense`;
  
    this.angularFire.collection(path).get().pipe(
      map(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
          this.utilsSvc.routerLink("/settings");
          this.utilsSvc.presentToast("Datos eliminados correctamente", "success");
        });
        return true; // Puedes ajustar esto según tus necesidades       
      }),
      catchError(error => {
        loading.dismiss();
        this.utilsSvc.presentToast("Error", "danger");
        throw error; // Propaga el error para que el bloque finally también se ejecute
      }),
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe();
  }
  
}
