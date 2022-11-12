import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareVoucherPage } from './share-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: ShareVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareVoucherPageRoutingModule {}
