import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayWithVoucherConfirmModalPage } from './pay-with-voucher-confirm-modal.page';

describe('PayWithVoucherConfirmModalPage', () => {
  let component: PayWithVoucherConfirmModalPage;
  let fixture: ComponentFixture<PayWithVoucherConfirmModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWithVoucherConfirmModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayWithVoucherConfirmModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
