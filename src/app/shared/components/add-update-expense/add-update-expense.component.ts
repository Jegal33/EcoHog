import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-expense',
  templateUrl: './add-update-expense.component.html',
  styleUrls: ['./add-update-expense.component.scss'],
})
export class AddUpdateExpenseComponent  implements OnInit {

  currentDate = new Date();

  form = new FormGroup({
    category: new FormControl('',[Validators.required]),
    amount: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    date: new FormControl(this.currentDate.toISOString(),[ Validators.required])
  })

  // Puedes también definir límites (minDate y maxDate) si es necesario
  minDate = '2000-01-01';
  maxDate = '2050-12-31';

  // Obtiene la fecha actual para establecerla como valor predeterminado
  defaultDate = this.currentDate.toISOString();

  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  mostrarValores() {
    console.log(this.form.value);
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }


  ngOnInit() {
  }

  async submit(){
    if (this.form.value){
      this.setExpensesInfo();
      this.utilsSvc.dismissModal();
    }
  }


  async setExpensesInfo(){
    if (this.form.value){

      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      let path = `users/${this.user().uid}/expense`;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        //this.utilsSvc.saveInLocalStorage('expense', this.form.value)
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();

      }).catch(error => { 
        console.log(error);
        loading.dismiss();
        this.utilsSvc.presentToast("Error")

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

}
