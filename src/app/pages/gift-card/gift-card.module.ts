import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiftCardPageRoutingModule } from './gift-card-routing.module';

import { GiftCardPage } from './gift-card.page';
import { ComponentsModule } from 'src/app/components/components.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiftCardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GiftCardPage]
})
export class GiftCardPageModule {}
