import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { StorageService } from '../storage/storage.service';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  public loginStatus = false;
  role$ = new BehaviorSubject<string>('');
  constructor(private angularFireAuth: AngularFireAuth,
      private angularFirestore: AngularFirestore,
      private router: Router,
      private alertController: AlertController,
      private storageService: StorageService) {

  }

  init() {
      this.checkUser();
  }

  checkUser() {
      this.angularFireAuth.authState.subscribe(async (user) => {
          if (user) {
              this.loginStatus = true;
              let userData: any = await this.angularFirestore.collection('users').doc(user.uid).valueChanges().pipe(first()).toPromise();
              if (userData) {
                  this.userData = userData;
                  this.userData.uid = user.uid;
                  this.role$.next(userData.role);
                  await this.storageService.setData('userData', JSON.stringify(this.userData));
                  if (this.userData.role == 'vendor') {
                      this.router.navigate(['tabs/vendor-transactions']);
                  } 
                  if (this.userData.role == 'admin') {
                    this.router.navigate(['tabs/admin-vouchers']);
                  } 
                  if (this.userData.role == 'user') {
                    let routeTo = await this.storageService.getData('routeTo');
              if (routeTo && routeTo.length > 0) {
                  this.router.navigate([routeTo]);
                  this.storageService.setData('routeTo', null);
              }
              else{
                this.router.navigate(['']);
              }

                  }
              } else {}
              
          } else {
              this.storageService.setData('userData', null);
              this.loginStatus = false;
              this.router.navigate(['']);
          }
      });

  }

  getLoginStatus() {
      return this.loginStatus;
  }

  loginUser(userEmail, userPassword) {
      return new Promise < any > ((resolve, reject) => {
          this.angularFireAuth.signInWithEmailAndPassword(userEmail, userPassword)
              .then(
                  res => resolve(res),
                  err => reject(err))
      })
  }

  registerUser(userEmail, userPassword) {
      return new Promise < any > ((resolve, reject) => {
          this.angularFireAuth.createUserWithEmailAndPassword(userEmail, userPassword)
              .then(
                  res => resolve(res),
                  err => reject(err))
      })
  }

  logoutUser() {
      return new Promise < void > ((resolve, reject) => {
          if (this.angularFireAuth.currentUser) {
              this.angularFireAuth.signOut()
                  .then(() => {
                      this.storageService.setData('userData', null);
                      this.loginStatus = false;
                      this.router.navigate(['']);
                      this.presentAlert('Logout Successfully');
                      resolve();
                  }).catch((error) => {
                      reject();
                  });
          }
      })
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [ {
          text: 'Okay',
        }
      ]
    });
    await alert.present();
  }
}