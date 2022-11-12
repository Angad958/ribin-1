import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminVouchersPage } from './admin-vouchers.page';

const routes: Routes = [
  {
    path: '',
    component: AdminVouchersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminVouchersPageRoutingModule {}
