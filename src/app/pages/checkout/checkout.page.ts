import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartData;
  tax = 10;
  routeData;
  paymentMethods = ['paytm'];
  selectedPaymentMethod;
  currenyCode;
  
  constructor(private router: Router,
             private firebaseService:FirebaseService,
            private storageService:StorageService,
            private paymentService: PaymentService,
            private sharedService: SharedService) { }

  async ngOnInit() {
    this.currenyCode = environment.currencyCode;
    this.cartData = await this.storageService.getData('cartData');
  }

  // onCheckout(){
  //   this.router.navigate(['login']);
  // }

  async onCheckout() {
    await this.sharedService.presentLoading();
    let user =  JSON.parse(await this.storageService.getData('userData'));
    let uid = user.uid;

    let voucherData = this.cartData;
    voucherData.purchaseBy = user;
    voucherData.createdAt = new Date();
    voucherData.payment = {
      mode: this.selectedPaymentMethod,
      status: 'pending'
    }
     
    let voucherDoc = await this.firebaseService.createVoucher(voucherData);
    if(this.selectedPaymentMethod === 'paytm') {
      const res = await this.paymentService.payWithPaytm({
        docId: voucherDoc.id,
        amount: this.cartData.voucherAmount + this.tax,
        collection: 'vouchers',
        uid
      });
    }
    this.sharedService.dismissLoading();
    this.router.navigate([`share-voucher`, voucherDoc.id]);
  }

  selectPaymentMethod(item){
    this.selectedPaymentMethod = item;
  }


}
