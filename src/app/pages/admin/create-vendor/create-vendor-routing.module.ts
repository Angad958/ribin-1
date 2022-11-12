import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVendorPage } from './create-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVendorPageRoutingModule {}
