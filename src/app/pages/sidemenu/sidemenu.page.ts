import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {
  loginStatus = false;
  userRole;

  constructor(private authService:AuthService,
              private alertController: AlertController,
              private router:Router,
              private storageService: StorageService,
              private navCtrl:NavController) { }

  ngOnInit() {
  }

  async menuWillOpen(){
    this.loginStatus = this.authService.getLoginStatus();
    if (this.loginStatus) {
      this.userRole =  JSON.parse(await this.storageService.getData('userData')).role;
      
    }
  }
  logout() {
    this.authService.logoutUser()
      .then(res => {
      })
      .catch(error => {
      })
  }

  login(){
    this.router.navigate(['login']);

  }


  

}
