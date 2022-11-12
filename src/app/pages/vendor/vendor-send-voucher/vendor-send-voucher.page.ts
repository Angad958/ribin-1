import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vendor-send-voucher',
  templateUrl: './vendor-send-voucher.page.html',
  styleUrls: ['./vendor-send-voucher.page.scss'],
})
export class VendorSendVoucherPage implements OnInit {
  voucherAmount
  PhoneNumber;
   voucherId;
 voucherData;
 currencyCode;

 shareText: string;
 shareImgURL:string;
 sharelink: string;
 voucherSub;
handlerMessage = 'You have successfully sent the Gift Card 😊';
  e=false;
 
  constructor(private alertController: AlertController,private toastController: ToastController,private activatedRoute:ActivatedRoute,
              private socialSharing: SocialSharing,
              private firebaseService:FirebaseService) { }
  
  ngOnInit() {
  }

  
  async init(){
    this.voucherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.voucherData = await this.firebaseService.subscribeVoucherbyId(this.voucherId);
    this.voucherSub = this.firebaseService.voucherDoc$.subscribe(data => {
      this.voucherData = data;
    });
    this.currencyCode = environment.currencyCode;
    
    this.shareText = `Yay! ${this.voucherData.vendorDetails.name} has sent you a gift card of INR${this.voucherAmount} on Ribin. `; //You can access it here: DOWNLOAD LINK
    this.shareImgURL = "https://stagingdemo.tk/public/images/ribin-app-logo.png";
    this.sharelink = this.voucherData.dynamicLink;
  }
   onShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.shareText, this.shareImgURL, this.sharelink).then(() => {
  }).catch((err) => {
  });
 }


 async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
            this.e = false;
          }
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
           handler: () => {
            
             this.e = true;
           }
           
        },
      ],
    });
     
   await alert.present();
  
   this.handleClear();
   this.presentToast('top');
 }
  
  
  handleClear() {
     
     this.PhoneNumber = ' ';
     this.voucherAmount = ' ';
  }


 async presentToast(position:  'top') {
    const toast = await this.toastController.create({
      message: this.handlerMessage,
      cssClass: 'custom-toast',
      duration: 3000,
      position: position,
      icon:'information',
    });
     await toast.present(); 
     
        
      
     
     }
}
