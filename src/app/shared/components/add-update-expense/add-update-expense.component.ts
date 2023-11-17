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
    category: new FormControl('',[Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    date: new FormControl(this.currentDate.toISOString(),[ Validators.required])
  })

  
  // Define límites (minDate y maxDate) si es necesario
  minDate = '2000-01-01';
  maxDate = '2050-12-31';

  // Obtiene la fecha actual para establecerla como valor predeterminado
  defaultDate = this.currentDate.toISOString();

  
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  mostrarValores() {
    console.log(this.form.value);
  }

  user = {} as User;
   
  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

    if (this.expense) this.form.setValue(this.expense);
  }

  // Envia formulario
  async submit(){
    if (this.form.value){
      if (this.expense) this.updateExpense();
      else this.addExpense();
    }
  }

  // Convierte string en number
  setNumberInputs(){
    let {amount} = this.form.controls;

    //if (amount.value) amount.setValue(parseFloat(amount.value));
  }


  // Agrega gasto
  async addExpense(){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user.uid}/expense`;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        //this.utilsSvc.saveInLocalStorage('expense', this.form.value)
        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        console.log(res)

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error")

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

        //this.utilsSvc.saveInLocalStorage('expense', this.form.value)
        this.utilsSvc.dismissModal({ success: true});
        this.form.reset();
        console.log(res)

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error")

      }).finally(() => {
        loading.dismiss();
      })
  }

}
