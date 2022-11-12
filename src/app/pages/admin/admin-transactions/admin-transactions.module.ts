import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTransactionsPageRoutingModule } from './admin-transactions-routing.module';

import { AdminTransactionsPage } from './admin-transactions.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTransactionsPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [AdminTransactionsPage]
})
export class AdminTransactionsPageModule {}
