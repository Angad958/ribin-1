import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConsoleService } from 'src/app/services/console/console.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  activeTab;
  userRole;
  loginStatus = false;
  constructor(private router: Router,
              private consoleService:ConsoleService,
              private storageService:StorageService,
              public authService:AuthService) {
   
  }
  async ngOnInit(){
    this.consoleService.consoleLog('tabs.page.ts 25:ngOnInit', '')

  }

  async ionViewWillEnter() {
    this.consoleService.consoleLog('tabs.page.ts 30:ionViewWillEnter', '')
    let userData = await this.storageService.getData('userData');
    if (userData && userData.length > 0) {
      this.loginStatus = true;
      this.userRole =  JSON.parse(await this.storageService.getData('userData')).role;
    }
    this.authService.role$.subscribe(role => {
      this.userRole = role;
      console.log('this.userRol', this.userRole);
    });
  }

  onClick(){
    if (this.authService.loginStatus) {
      this.router.navigate(['/tabs/user-vouchers']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  getCurrentTab(){
    this.activeTab = this.tabs.getSelected();
  }

}
