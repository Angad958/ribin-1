import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayWithVoucherPageRoutingModule } from './pay-with-voucher-routing.module';

import { PayWithVoucherPage } from './pay-with-voucher.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayWithVoucherPageRoutingModule,
    ApplicationDirectivesModule,
    ComponentsModule
  ],
  declarations: [PayWithVoucherPage]
})
export class PayWithVoucherPageModule {}
