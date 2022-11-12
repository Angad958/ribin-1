import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorCarouselTwoComponent } from './vendor-carousel-two.component';

describe('VendorCarouselTwoComponent', () => {
  let component: VendorCarouselTwoComponent;
  let fixture: ComponentFixture<VendorCarouselTwoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCarouselTwoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCarouselTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
