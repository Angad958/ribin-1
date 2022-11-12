import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectVoucherDesignPageRoutingModule } from './select-voucher-design-routing.module';

import { SelectVoucherDesignPage } from './select-voucher-design.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectVoucherDesignPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [SelectVoucherDesignPage]
})
export class SelectVoucherDesignPageModule {}
