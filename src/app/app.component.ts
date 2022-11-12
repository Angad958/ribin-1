import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService,
    private platform: Platform,
    private router:Router,
    private firebaseDynamicLinks: FirebaseDynamicLinks) {
    this.initializeApp();

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.init();
      this.handleVoucherSharing();
    });

  }

  handleVoucherSharing() {
    try {
      this.firebaseDynamicLinks.onDynamicLink()
        .subscribe((res: any) => {
          if (res.deepLink.includes('voucher')) {
            this.navigateToVoucher(res.deepLink);
          }
        }), (error: any) => {
        };
    } catch (error) {
    }

  }

  navigateToVoucher(link: string) {
    try {
      let voucherId = '';
      for (let index = link.length - 2; index > 0; index--) {
        if (link[index] === '/') {
          break;
        } else {
          voucherId += link[index];
        }
      }
      voucherId = voucherId.split('').reverse().join('');
      this.router.navigate(['gift-card', voucherId]);
    } catch (error) {
    }

  }

}







