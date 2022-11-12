import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-vouchers',
  templateUrl: './admin-vouchers.page.html',
  styleUrls: ['./admin-vouchers.page.scss'],
})
export class AdminVouchersPage implements OnInit {
 vouchers;
 skeletonArray = [1,2,3,4,5,6,7,8,9,10];
 currenyCode;
 showLoadMore = true;
 isModalOpen = false;
 selectedVoucher;
 
  constructor(
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.currenyCode = environment.currencyCode;
  }

  async ionViewWillEnter() {
    this.vouchers = await this.firebaseService.getAllVouchers();
    if (this.vouchers.length < 15) {
      this.showLoadMore = false;
   }
  }

  async loadMore(event){
    let vouchers:any = await this.firebaseService.getMoreAllTransactions();
    this.vouchers = [...this.vouchers, ...vouchers];
    if (vouchers.length < 15) {
      event.target.disabled = true;
    }
   }

   showVoucherDetails(item){
    this.isModalOpen = true;
    this.selectedVoucher = item;
   }
   closeModal(){
    this.isModalOpen = false;
   }

}
