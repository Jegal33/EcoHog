import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataControlsPageRoutingModule } from './data-controls-routing.module';

import { DataControlsPage } from './data-controls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataControlsPageRoutingModule
  ],
  declarations: [DataControlsPage]
})
export class DataControlsPageModule {}
