import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTransactionsPage } from './admin-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTransactionsPageRoutingModule {}
