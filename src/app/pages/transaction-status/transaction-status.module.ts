import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionStatusPageRoutingModule } from './transaction-status-routing.module';

import { TransactionStatusPage } from './transaction-status.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionStatusPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransactionStatusPage]
})
export class TransactionStatusPageModule {}
