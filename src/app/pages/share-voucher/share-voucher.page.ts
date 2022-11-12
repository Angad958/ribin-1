import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-share-voucher',
  templateUrl: './share-voucher.page.html',
  styleUrls: ['./share-voucher.page.scss'],
})
export class ShareVoucherPage implements OnInit {
 voucherId;
 voucherData;
 currencyCode;

 shareText: string;
 shareImgURL:string;
 sharelink: string;
 voucherSub;
  constructor(private activatedRoute:ActivatedRoute,
              private socialSharing: SocialSharing,
              private firebaseService:FirebaseService) {
                this.init();
               }

  async ngOnInit() {
    
  }

  async init(){
    this.voucherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.voucherData = await this.firebaseService.subscribeVoucherbyId(this.voucherId);
    this.voucherSub = this.firebaseService.voucherDoc$.subscribe(data => {
      this.voucherData = data;
    });
    this.currencyCode = environment.currencyCode;
    this.shareText = `Yippe you got a ${this.voucherData.vendorDetails.name} voucher of INR${this.voucherData.voucherAmount}`;
    this.shareImgURL = "https://stagingdemo.tk/public/images/ribin-app-logo.png";
    this.sharelink = this.voucherData.dynamicLink;
  }
  
  ionViewDidLeave() {
    this.unsubscribe();
  }
  unsubscribe(){
    this.voucherSub.unsubscribe();
    //this.firebaseService.voucherDoc$.unsubscribe();
    this.firebaseService.voucherSub.unsubscribe();
  }

  onShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.shareText, this.shareImgURL, this.sharelink).then(() => {
  }).catch((err) => {
  });
 }

}
