import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareVoucherPageRoutingModule } from './share-voucher-routing.module';

import { ShareVoucherPage } from './share-voucher.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { RouterModule } from '@angular/router';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareVoucherPageRoutingModule,
    ApplicationDirectivesModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [ShareVoucherPage]
})
export class ShareVoucherPageModule {}
