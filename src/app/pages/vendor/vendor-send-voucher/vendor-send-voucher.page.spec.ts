import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorSendVoucherPage } from './vendor-send-voucher.page';

describe('VendorSendVoucherPage', () => {
  let component: VendorSendVoucherPage;
  let fixture: ComponentFixture<VendorSendVoucherPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSendVoucherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorSendVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
