import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.modules';
import { IonicModule } from '@ionic/angular';

import { VendorSendVoucherPageRoutingModule } from './vendor-send-voucher-routing.module';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';
import { VendorSendVoucherPage } from './vendor-send-voucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ComponentsModule,
    VendorSendVoucherPageRoutingModule,
     ApplicationDirectivesModule
  ],
  declarations: [VendorSendVoucherPage]
})
export class VendorSendVoucherPageModule {}
