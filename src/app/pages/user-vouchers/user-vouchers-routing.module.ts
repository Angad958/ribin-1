import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserVouchersPage } from './user-vouchers.page';

const routes: Routes = [
  {
    path: '',
    component: UserVouchersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserVouchersPageRoutingModule {}
