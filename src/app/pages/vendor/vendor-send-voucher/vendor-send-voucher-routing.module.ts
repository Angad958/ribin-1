import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorSendVoucherPage } from './vendor-send-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: VendorSendVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorSendVoucherPageRoutingModule {}
