import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-pay-with-voucher-confirm-modal',
  templateUrl: './pay-with-voucher-confirm-modal.page.html',
  styleUrls: ['./pay-with-voucher-confirm-modal.page.scss'],
})
export class PayWithVoucherConfirmModalPage implements OnInit {
  amount;
  currencyCode;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.currencyCode = environment.currencyCode;
  }

  dismissModal(status){
    
    this.modalController.dismiss(status);
  }

}
