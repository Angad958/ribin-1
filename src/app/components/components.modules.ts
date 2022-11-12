import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CategoriesCarouselComponent } from './categories-carousel/categories-carousel.component';
import { VendorCarouselOneComponent } from './vendor-carousel-one/vendor-carousel-one.component';
import { VendorCarouselTwoComponent } from './vendor-carousel-two/vendor-carousel-two.component';
import { VendorThumbOneComponent } from './vendor-thumb-one/vendor-thumb-one.component';
import { SkeletonOneComponent } from './skeleton-one/skeleton-one.component';
import { ApplicationDirectivesModule } from '../directives/application-directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ApplicationDirectivesModule,
      ],
    declarations: [
        PageHeaderComponent,
        CategoriesCarouselComponent,
        VendorCarouselOneComponent,
        VendorCarouselTwoComponent,
        VendorThumbOneComponent,
        SkeletonOneComponent
    ],
    exports: [
        PageHeaderComponent,
        CategoriesCarouselComponent,
        VendorCarouselOneComponent,
        VendorCarouselTwoComponent,
        VendorThumbOneComponent,
        SkeletonOneComponent
      ]
})
export class ComponentsModule {}