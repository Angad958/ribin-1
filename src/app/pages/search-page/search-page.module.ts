import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPagePageRoutingModule } from './search-page-routing.module';

import { SearchPagePage } from './search-page.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchPagePage]
})
export class SearchPagePageModule {}
