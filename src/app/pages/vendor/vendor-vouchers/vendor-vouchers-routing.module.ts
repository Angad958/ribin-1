import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorVouchersPage } from './vendor-vouchers.page';

const routes: Routes = [
  {
    path: '',
    component: VendorVouchersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorVouchersPageRoutingModule {}
