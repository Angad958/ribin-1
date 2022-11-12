import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buy-vendor-voucher',
  templateUrl: './buy-vendor-voucher.page.html',
  styleUrls: ['./buy-vendor-voucher.page.scss'],
})
export class BuyVendorVoucherPage implements OnInit {
  selectedUse:any;
  giftCards = [50, 100, 200, 300, 400, 500];
  voucherAmount:any;
  vendorDetails;
  vendorID;
  branches;
  selectedCities;
  currencyCode;
  errorMessage;

  constructor(private router: Router,
              private firebaseService:FirebaseService, 
              private modalController: ModalController,
              private activatedRoute:ActivatedRoute) { }

  async ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState) {
      this.vendorDetails = routerState.data;
    };
    this.currencyCode = environment.currencyCode;
    this.vendorID = this.activatedRoute.snapshot.paramMap.get('id');
    this.vendorDetails.id = this.vendorID;
  }

  onSelectUse(i){
    this.selectedUse = i;
  }

  selectGiftCard(item){
    this.voucherAmount = item.value;
  }

  onNext(){
  //   let selectedBranchesIDs = [];
  //   this.selectedCities.forEach((item) => {
  //     delete item.isChecked;
  // });
  //   let selectedBranches = [];
  //   let selectedBranchesIDs = [];
  //   this.branches.forEach((value, index) => {
  //     if (value.isChecked) {
  //       value.isChecked = false;
  //       selectedBranches.push(value);
  //       selectedBranchesIDs.push(value.id);
  //     }
  //   });
    const navigationExtras: NavigationExtras = {
      state: {
        data:{
          voucherAmount:this.voucherAmount,
          remainingBalance : this.voucherAmount,
          vendorDetails:this.vendorDetails,
          selectedCities:this.selectedCities,
        }
      }
};
    this.router.navigate(['select-voucher-design'], navigationExtras);
  }

  async modalWillPresent(){
    this.branches = await this.firebaseService.getVendorBranches(this.vendorID);
  }

  selectCity(){
    this.selectedCities = this.vendorDetails.cities.filter((value, index) => {
      return value.isChecked
    });
    this.modalController.dismiss()
   }

   deleteBranch(i){
    this.selectedCities.splice(i, 1);
   }

   voucherAmountChange(){
    if(this.voucherAmount < this.vendorDetails.minVoucherAmount || this.voucherAmount > this.vendorDetails.maxVoucherAmount){
       this.errorMessage = `Amount must be between ${this.vendorDetails.minVoucherAmount} and ${this.vendorDetails.maxVoucherAmount}`;
    }
    else{
      this.errorMessage = null;
    }
   }
}
