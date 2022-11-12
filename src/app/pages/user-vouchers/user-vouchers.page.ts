import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-vouchers',
  templateUrl: './user-vouchers.page.html',
  styleUrls: ['./user-vouchers.page.scss'],
})
export class UserVouchersPage implements OnInit {
  vouchers:any;
  currencyCode;
  loginStatus = false;
  constructor(private router: Router,
              public authService:AuthService,
              private firebaseService:FirebaseService) { }

  async ngOnInit() {
    
  }
  async ionViewWillEnter() {
    this.currencyCode = environment.currencyCode;
    this.vouchers = await this.firebaseService.getUserVouchers();
    
  }
  onClick(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data:item,
      }
};
    this.router.navigate(['pay-with-voucher', item.id], navigationExtras);
  }

  onClickLogin(){
    const navigationExtras: NavigationExtras = {
      state: {
        data:{
          routeTo:'/tabs/my-vouchers'
        }
      }
};
    this.router.navigate(['login'], navigationExtras);

  }

}
