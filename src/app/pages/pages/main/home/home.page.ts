import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Expense } from 'src/app/models/expenses.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateExpenseComponent } from 'src/app/shared/components/add-update-expense/add-update-expense.component';
import { orderBy } from 'firebase/firestore';
import { Category } from 'src/app/models/categories.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseSvc : FirebaseService, private utilSvc : UtilsService) { }

  expenses: Expense[] = [];
  categories: Category[] = [];
  loading: boolean = false;

  ngOnInit() {
  }

  // refrescar
  doRefresh(event) { 
    setTimeout(() => {
      this.getExpenses();
      this.getCategories();
      event.target.complete();
    }, 1000);
  }


  // Agregar gastos
  async addUpdateExpense(expense?: Expense) {
    let success = await this.utilSvc.presentModal({
      component: AddUpdateExpenseComponent,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      componentProps: {expense}
    })
    if (success) this.getExpenses();
  }

  // Obtener datos del usuario del almacenamiento local
  user(): User{
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getExpenses();
    this.getCategories();
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

  
  // Obtener categorias
  getCategories(){
    let path = `category`;

    this.loading = true;

    let query = (
      orderBy('name', 'desc')
    )

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.categories = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })
  }

  // Sumar gastos
  totalExpenses(){
    return this.expenses.reduce((indide, expense) => indide + expense.amount, 0);
  }



}
