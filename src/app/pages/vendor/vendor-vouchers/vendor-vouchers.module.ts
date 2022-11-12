import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorVouchersPageRoutingModule } from './vendor-vouchers-routing.module';

import { VendorVouchersPage } from './vendor-vouchers.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorVouchersPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [VendorVouchersPage]
})
export class VendorVouchersPageModule {}
