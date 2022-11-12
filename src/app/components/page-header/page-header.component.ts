import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router} from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() showLogo: boolean;
  @Input() showLine: boolean;
  @Input() showMenuBtn: boolean;
  @Input() showBackBtn: boolean;
  @Input() title: string;
  loginStatus;
  profilePic;
  constructor(public authService:AuthService,
              private storageService:StorageService,
              private router:Router,) { }

  async ngOnInit() {
    let profilePic =  JSON.parse(await this.storageService.getData('userData')).dP;
    if (profilePic) {
      this.profilePic = profilePic;
    }
    
  }
  async onClickProfile(){
    let loginStatus = this.authService.loginStatus;
    if (loginStatus) {
      this.router.navigate(['tabs/profile']);
      let profilePic =  JSON.parse(await this.storageService.getData('userData')).dP;
    }
    else{
      this.router.navigate(['login']);
    }

  }

}
