import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginForm') loginForm:NgForm;
  routeTo = '';
  userEmail;
  userPassword;
  errorMessage;
  loading;
  constructor(private authService:AuthService,
              private router:Router, 
              private loadingController: LoadingController,
              private toastController: ToastController) { }

  onSubmit(){
    this.loginUser()
  }
  ngOnInit() {
    // const routerState = this.router.getCurrentNavigation().extras.state;
    // if (routerState){
    //     this.routeTo = routerState.data.routeTo;   
    // }
  }


  loginUser() {
    this.presentLoading();
    this.authService.loginUser(this.loginForm.value.userEmail,this.loginForm.value.userPassword)
      .then(res => {
        this.errorMessage = false;
        this.loading.dismiss();
      }, err => {
        this.loading.dismiss();
        if (err.message.includes("user-not-found")) {
          this.errorMessage =`User doesn't exist`;
        }
        else if(err.message.includes("wrong-password")){
          this.errorMessage =`Email & password doesn't match`;
        }
      })
  }

  goToPage(page){
    this.router.navigate([page]);
  }

  goToRegister(){
    const navigationExtras: NavigationExtras = {
      state: {
        data:{
          routeTo:this.routeTo
        }
      }
};
    this.router.navigate(['register'], navigationExtras);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 10000,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

}
