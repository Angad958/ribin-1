import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyVendorVoucherPageRoutingModule } from './buy-vendor-voucher-routing.module';

import { BuyVendorVoucherPage } from './buy-vendor-voucher.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyVendorVoucherPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [BuyVendorVoucherPage]
})
export class BuyVendorVoucherPageModule {}
