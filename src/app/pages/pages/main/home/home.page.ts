import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateExpenseComponent } from 'src/app/shared/components/add-update-expense/add-update-expense.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseSvc : FirebaseService, private utilSvc : UtilsService) { }

  ngOnInit() {
  }

  expenses: any[] = [];

  // Agregar gastos
  addUpdateExpense() {
    this.utilSvc.presentModal({
      component: AddUpdateExpenseComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false
    })
  }

  // Obtener datos del usuario del almacenamiento local
  user(): User{
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter(){
    this.getExpenses();
  }

  // Obtener gastos
  getExpenses(){
    let path = `users/${this.user().uid}/expense`;
    
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) =>{
        console.log(res)
        this.expenses = res;
        sub.unsubscribe();
      }   
    })
  }

  
}