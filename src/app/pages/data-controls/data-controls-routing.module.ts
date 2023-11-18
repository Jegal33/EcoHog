import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataControlsPage } from './data-controls.page';

const routes: Routes = [
  {
    path: '',
    component: DataControlsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataControlsPageRoutingModule {}
