import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { StorageService } from 'src/app/services/storage/storage.service';

declare var party: any;
@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.page.html',
  styleUrls: ['./gift-card.page.scss'],
})
export class GiftCardPage implements OnInit {
  showSurprise = false;
  voucherID;
  voucherData;
  errorMessage;
  uid;
  loginStatus;
  showHome = false;
  userData:any;
  constructor(private activatedRoute:ActivatedRoute, 
    private storageService:StorageService,
    private router: Router,
    private authService:AuthService,
    private firebaseService:FirebaseService) { }

  async ngOnInit() {
   
  }

  async ionViewWillEnter() {
    this.userData = JSON.parse(await this.storageService.getData('userData'));

    if (this.userData) {
      this.loginStatus = true;
      this.uid =  JSON.parse(await this.storageService.getData('userData')).uid;
    }
    else{
      this.loginStatus = false;
    }
    this.voucherID = this.activatedRoute.snapshot.paramMap.get('id');
    this.voucherData = await this.firebaseService.getVoucherbyId(this.voucherID);
  }

  onClick(){
    
  }

  doLogin(){ 
    this.storageService.setData('routeTo', `/gift-card/${this.voucherID}`);
    this.router.navigate(['login']);
  }

  doPop() {
    this.showSurprise = true;
    var options = {
        count: party.variation.range(80, 100),
    }
    var party1 = document.getElementById("party1");
    setTimeout(() => {
      party.confetti(party1, options);
    }, 100);
    this.showHome = true;
  }

  async reedemVoucher(){
    if (this.voucherData.isRedeemed) {
      this.errorMessage = 'This voucher already reedemed';
      this.showHome = true;
    }
    else if(this.voucherData.purchaseBy == this.uid){
      this.errorMessage = 'You cannot reedemed your own purchased voucher';
      this.showHome = true;
    }
    else {
      let update = await this.firebaseService.updateVoucher(this.voucherID, {'isRedeemed':true,'redeemBy':this.userData});
      this.doPop();
    }
  }

}
