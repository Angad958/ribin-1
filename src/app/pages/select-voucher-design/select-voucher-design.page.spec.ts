import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectVoucherDesignPage } from './select-voucher-design.page';

describe('SelectVoucherDesignPage', () => {
  let component: SelectVoucherDesignPage;
  let fixture: ComponentFixture<SelectVoucherDesignPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVoucherDesignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectVoucherDesignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
