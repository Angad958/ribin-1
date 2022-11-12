import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('registrationForm') registrationForm:NgForm;
  routeToCheckout;
  userEmail;
  userPassword;
  errorMessage;
  successMessage;
  routeTo = '';
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState){
        this.routeTo = routerState.data.routeTo;   
    }
  }

  onSubmit(){
    this.registerUser()
  }

  registerUser() {
    this.authService.registerUser(this.registrationForm.value.userEmail,this.registrationForm.value.userPassword)
      .then(res => {
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      }, err => {
        if (err.message.includes("email-already-in-use")) {
          this.errorMessage =`User already exist, please try login`;
        }
        else if(err.message.includes("wrong-password")){
          this.errorMessage =`Email & password doesn't match`;
        }
      })
  }



  goToPage(page){
    this.router.navigate([page]);
  }

  goToLogin(){
    this.router.navigate(['register']);
  }

  

}
