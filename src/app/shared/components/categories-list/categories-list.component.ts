import { Component, Input, OnInit } from '@angular/core';
import { orderBy, where } from 'firebase/firestore';
import { Category } from 'src/app/models/categories.model';
import { Expense } from 'src/app/models/expenses.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent  implements OnInit {

  @Input() category: Category;
  expenses: Expense[] = [];
  loading: boolean = false;

  constructor(private firebaseSvc : FirebaseService, private utilSvc : UtilsService) { }

  ngOnInit() {}

   // Obtener datos del usuario del almacenamiento local
   user(): User{
    return this.utilSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getExpenses();

  }

  // Obtener gastos
  getExpenses(){
    let path = `users/${this.user().uid}/expense`;

    this.loading = true;

    let query = (
      orderBy('date', 'desc'),
      where('category', '==', this.category.name)
    );

    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
      next: (res: any) =>{
        console.log(res);
        this.expenses = res;

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
