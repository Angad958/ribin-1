import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitiesListPageRoutingModule } from './cities-list-routing.module';

import { CitiesListPage } from './cities-list.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitiesListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CitiesListPage]
})
export class CitiesListPageModule {}
