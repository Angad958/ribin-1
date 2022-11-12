import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminVouchersPageRoutingModule } from './admin-vouchers-routing.module';

import { AdminVouchersPage } from './admin-vouchers.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminVouchersPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [AdminVouchersPage]
})
export class AdminVouchersPageModule {}
