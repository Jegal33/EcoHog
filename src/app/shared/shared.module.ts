import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateExpenseComponent } from './components/add-update-expense/add-update-expense.component';
import { AddUpdateIncomeComponent } from './components/add-update-income/add-update-income.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';




@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateExpenseComponent,
    AddUpdateIncomeComponent,
    CategoriesListComponent

  ],
  exports:[
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule,
    AddUpdateExpenseComponent,
    AddUpdateIncomeComponent,
    CategoriesListComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
