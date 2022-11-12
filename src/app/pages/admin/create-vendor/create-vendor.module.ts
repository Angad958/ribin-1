import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVendorPageRoutingModule } from './create-vendor-routing.module';

import { CreateVendorPage } from './create-vendor.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateVendorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateVendorPage]
})
export class CreateVendorPageModule {}
