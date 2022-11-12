import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayWithVoucherConfirmModalPageRoutingModule } from './pay-with-voucher-confirm-modal-routing.module';

import { PayWithVoucherConfirmModalPage } from './pay-with-voucher-confirm-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayWithVoucherConfirmModalPageRoutingModule
  ],
  declarations: [PayWithVoucherConfirmModalPage]
})
export class PayWithVoucherConfirmModalPageModule {}
