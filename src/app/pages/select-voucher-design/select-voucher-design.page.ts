import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-voucher-design',
  templateUrl: './select-voucher-design.page.html',
  styleUrls: ['./select-voucher-design.page.scss'],
})
export class SelectVoucherDesignPage implements OnInit {
  voucherAmount;
  cardDesigns;
  selectedUse;
  selectedVoucerTemplate:any;
  customMessage:string = '';
  relatedMessage:string = '';
  vendorID;
  loginStatus = false;
  routerStateData;
  currencyCode;
  constructor(private router: Router,
              private firebaseService:FirebaseService,
              private storageService:StorageService,
              private authService:AuthService,) { }

  async ngOnInit() {
    this.currencyCode = environment.currencyCode;
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState) {
      this.routerStateData = routerState.data;
    };
    this.cardDesigns = await this.firebaseService.getVouchersTemplates();
  }

  selectDesign(item){
    this.selectedVoucerTemplate = item;
  }

  buttonDisabled(){
    let status;
  if(!this.selectedVoucerTemplate || (this.selectedVoucerTemplate && this.selectedVoucerTemplate.name == 'card-6' && !this.customMessage)){
    status = true
  }
  else{
    status = false
  }
  return status;
  }

  async onNext(){
    let cartData = this.routerStateData;
    cartData.voucherTemplate = this.selectedVoucerTemplate;
    cartData.relatedMessage = this.relatedMessage;
    cartData.customMessage = this.customMessage;
    await this.storageService.setData('cartData', cartData);
    this.loginStatus = this.authService.getLoginStatus();
    if (!this.loginStatus) {
      this.storageService.setData('routeTo', 'checkout');
      this.router.navigate(['login']);
      
    }
    else{this.router.navigate(['checkout']);
    }
  }

}
