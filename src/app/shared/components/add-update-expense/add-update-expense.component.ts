import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expenses.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-update-expense',
  templateUrl: './add-update-expense.component.html',
  styleUrls: ['./add-update-expense.component.scss'],
})
export class AddUpdateExpenseComponent  implements OnInit {

  @Input() expense: Expense;

  // Obtiene la fecha actual
  currentDate = new Date();

  form = new FormGroup({
    id: new FormControl('',),
    category: new FormControl('',[Validators.required]),
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

    if (this.expense) this.form.setValue(this.expense);
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
            this.deleteExpense();
          }
        }
      ]
    });
  }

  // Envia formulario
  async submit(){
    if (this.form.value){
      if (this.expense) this.updateExpense();
      else this.addExpense();
    }
  }

  // Agrega gasto
  async addExpense(){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user.uid}/expense`;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        this.utilsSvc.presentToast("Gasto agregado","success");

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error","danger");

      }).finally(() => {
        loading.dismiss();
      })
  }

  // Actualiza gasto
  async updateExpense(){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user.uid}/expense/${this.expense.id}`;

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        this.utilsSvc.presentToast("Gasto actualizado","success");

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error","danger")

      }).finally(() => {
        loading.dismiss();
      })
  }

  
  // Elimina gasto
  async deleteExpense(){

    const loading = await this.utilsSvc.loading();
    await loading.present();
    
    let path = `users/${this.user.uid}/expense/${this.expense.id}`;

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.utilsSvc.dismissModal({ success: true});
      this.form.reset();
      this.utilsSvc.presentToast("Gasto eliminado","success");

    }).catch(error => { 
      console.log(error);
      loading.dismiss();
      this.utilsSvc.presentToast("Error","danger")

    }).finally(() => {
      loading.dismiss();
    })
}

}
