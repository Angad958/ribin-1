import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData:any;
  constructor(
    private storageService:StorageService,
    private router:Router,
    private authService:AuthService,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.userData =  await JSON.parse(await this.storageService.getData('userData'));
  }

  editProfile() {
    const navigationExtras: NavigationExtras = {
      state: {
        data:this.userData,
      }
};
    this.router.navigate(['edit-profile'], navigationExtras);
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
      })
      .catch(error => {
      })
  }

}
