import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Income } from 'src/app/models/income.model';

@Component({
  selector: 'app-add-update-income',
  templateUrl: './add-update-income.component.html',
  styleUrls: ['./add-update-income.component.scss'],
})
export class AddUpdateIncomeComponent  implements OnInit {

  @Input() income: Income;
  // Obtiene la fecha actual
  currentDate = new Date();

  form = new FormGroup({
    id: new FormControl('',),
    amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    date: new FormControl(this.currentDate.toISOString(),[ Validators.required])
  })

  
  // Define límites (minDate y maxDate) si es necesario
  minDate = '2000-01-01';
  maxDate = '2050-12-31';

  // Obtiene la fecha actual para establecerla como valor predeterminado
  defaultDate = this.currentDate.toISOString();


  // Importaciones
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)



  // Obtiene usuario
  user = {} as User;


  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.income) this.form.setValue(this.income);
  }


  // Convierte string en number
  setNumberInputs(){
    let {amount} = this.form.controls;

    if (amount.value) amount.setValue(parseFloat(amount.value));
  }


  // Alerta de eliminar
  async confirmDeleteExpense() {
    this.utilsSvc.presentAlert({
      //header: 'Confirm!',
      message: '¿Estas seguro de eliminar este gasto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          handler: () => {
            this.deleteIncome();
          }
        }
      ]
    });
  }

  // Envia formulario
  async submit(){
    if (this.form.value){
      if (this.income) this.updateIncome();
      else this.addIncome();
    }
  }

  // Agrega Ingreso
  async addIncome(){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user.uid}/income`;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        this.utilsSvc.presentToast("Ingreso agregado","success");

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error","danger");

      }).finally(() => {
        loading.dismiss();
      })
  }

  // Actualiza Ingreso
  async updateIncome(){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user.uid}/income/${this.income.id}`;

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        this.utilsSvc.presentToast("Ingreso actualizado","success");
      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error","danger")

      }).finally(() => {
        loading.dismiss();
      })
  }

  
  // Elimina Ingreso
  async deleteIncome(){

    const loading = await this.utilsSvc.loading();
    await loading.present();
    
    let path = `users/${this.user.uid}/income/${this.income.id}`;

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.utilsSvc.dismissModal({ success: true});
      this.form.reset();
      this.utilsSvc.presentToast("Ingreso eliminado","success");

    }).catch(error => { 
      console.log(error);
      loading.dismiss();
      this.utilsSvc.presentToast("Error","danger")

    }).finally(() => {
      loading.dismiss();
    })
}




}