import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendor-vouchers',
  templateUrl: './vendor-vouchers.page.html',
  styleUrls: ['./vendor-vouchers.page.scss'],
})
export class VendorVouchersPage implements OnInit {
  vouchers;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  currenyCode;
  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.currenyCode = environment.currencyCode;
  }
  async ionViewWillEnter() {
    this.vouchers = await this.firebaseService.getVendorVouchers();
   
  }

  
  
 

}
