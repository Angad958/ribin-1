import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { PayWithVoucherConfirmModalPage } from '../pay-with-voucher-confirm-modal/pay-with-voucher-confirm-modal.page';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-pay-with-voucher',
  templateUrl: './pay-with-voucher.page.html',
  styleUrls: ['./pay-with-voucher.page.scss'],
})
export class PayWithVoucherPage implements OnInit {
  voucherData;
  currencyCode;
  selectedBranch;
  paidAmount;
  loading;
  homeBtn = false;
  isPaid = false;
  transactionID: string;
  transactionData;
  branches;
  constructor(private modalController: ModalController,
              private loadingController: LoadingController,
              private storageService:StorageService,
              private firebaseService:FirebaseService,
              private router:Router) { }

  ngOnInit() {
    this.currencyCode = environment.currencyCode;
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState) {
      this.voucherData = routerState.data;
    };
  }

   async onConfirmPay() {
    const modal = await this.modalController.create({
    component: PayWithVoucherConfirmModalPage,
    componentProps: { amount: this.paidAmount },
    cssClass:'confirm-modal',
    });

    modal.onDidDismiss()
      .then((data) => {
        let status = data.data;
        if (status = 'confirm') {
          this.createTranscation();
        }
        else if(status = 'cancel'){
        }
        //const user = data['data']; // Here's your selected user!
    });
    await modal.present();
   }

   selectBranch(item){
    this.selectedBranch = item;
   }

   async modalWillPresent(){
    let cityids = [];
    this.voucherData.selectedCities.forEach((value, index) => {
         cityids.push(value.id);
       });
       this.branches = await this.firebaseService.getVendorBranchesbyCity(this.voucherData.vendorDetails.id,cityids);
   }

   closeModal(){
    this.modalController.dismiss();
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles'
    });
    await this.loading.present();
   }

   async createTranscation(){
    this.presentLoading();
    let user =  JSON.parse(await this.storageService.getData('userData'));
    this.transactionData = {
      amount:parseFloat(this.paidAmount),
      paidBy:user,
      branch:this.selectedBranch,
      voucher:this.voucherData,
      type:'payment',
      createdAt : new Date()
    }
    let transaction = await this.firebaseService.createTransaction(this.transactionData);
    this.transactionID = transaction.id;
    
    this.voucherData.remainingBalance = this.voucherData.remainingBalance - this.paidAmount;
    this.isPaid = true;
    this.dismissLoading();
   }

   async subscribeTransaction(id){
    this.transactionData = await this.firebaseService.subscribeTransactionbyId(id);
    this.firebaseService.transactionDoc$.subscribe(data => {
      this.transactionData = data;
    });

   }

   dismissLoading() {
    this.loading.dismiss();
   }

   /*ionViewWillLeave() {
    this.firebaseService.transactionDoc$.unsubscribe();
    this.firebaseService.transactionSub.unsubscribe();
   }*/

}
