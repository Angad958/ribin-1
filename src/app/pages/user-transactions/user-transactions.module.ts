import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTransactionsPageRoutingModule } from './user-transactions-routing.module';

import { UserTransactionsPage } from './user-transactions.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTransactionsPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [UserTransactionsPage]
})
export class UserTransactionsPageModule {}
