import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayWithVoucherPage } from './pay-with-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: PayWithVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayWithVoucherPageRoutingModule {}
