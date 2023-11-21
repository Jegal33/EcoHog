import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import {AngularFirestore} from '@angular/fire/compat/firestore'
import { catchError, finalize, map, take } from 'rxjs';

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
          message: '¿Estás seguro de que deseas eliminar tu cuenta?',
          inputs: [
            {
              name: 'password',
              type: 'password',
              placeholder: 'Contraseña',
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Sí',
              handler: (data) => {
                // El objeto 'data' contendrá el valor del campo de entrada de contraseña
                const password = data.password;
                this.deleteUser(password);
              },
            },
          ],
        });
      }

    async deleteUser(password: string) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
      try {
        // Aquí obtén el UID, correo electrónico y contraseña del usuario que deseas eliminar
        const uid = this.user.uid;
        const email = this.user.email;
  
        await this.firebaseSvc.deleteUser(uid, email, password);
        loading.dismiss();
        this.utilsSvc.presentToast("Datos eliminados correctamente", "success");
      } catch (error) {
        this.utilsSvc.presentToast("Datos incorrectos", "danger");
        loading.dismiss();
      }
      loading.dismiss();
      
    }

    


  // Eliminar todos los datos
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
