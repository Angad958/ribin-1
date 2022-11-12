import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserVouchersPageRoutingModule } from './user-vouchers-routing.module';

import { UserVouchersPage } from './user-vouchers.page';
import { ComponentsModule } from 'src/app/components/components.modules';
import { ApplicationDirectivesModule } from 'src/app/directives/application-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserVouchersPageRoutingModule,
    ComponentsModule,
    ApplicationDirectivesModule
  ],
  declarations: [UserVouchersPage]
})
export class UserVouchersPageModule {}
