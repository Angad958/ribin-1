import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyVendorVoucherPage } from './buy-vendor-voucher.page';

describe('BuyVendorVoucherPage', () => {
  let component: BuyVendorVoucherPage;
  let fixture: ComponentFixture<BuyVendorVoucherPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyVendorVoucherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
