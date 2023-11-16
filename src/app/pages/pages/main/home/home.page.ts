import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Expense } from 'src/app/models/expenses.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateExpenseComponent } from 'src/app/shared/components/add-update-expense/add-update-expense.component';
import { orderBy } from 'firebase/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseSvc : FirebaseService, private utilSvc : UtilsService) { }

  expenses: Expense[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

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

    this.loading = true;

    let query = (
      orderBy('date', 'desc')
    )

    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.expenses = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })
  }

  signOut(){
    this.firebaseSvc.signOut()
  }


}
