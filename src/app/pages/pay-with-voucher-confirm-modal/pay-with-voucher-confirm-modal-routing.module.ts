import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWithVoucherConfirmModalPage } from './pay-with-voucher-confirm-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PayWithVoucherConfirmModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayWithVoucherConfirmModalPageRoutingModule {}
