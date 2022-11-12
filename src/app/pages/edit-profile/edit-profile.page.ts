import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData;
  profileImage;
  loading;
  constructor(private router: Router,
    private loadingController: LoadingController,
    private firebaseService:FirebaseService,
    private camera: Camera) {
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState) {
      this.userData = routerState.data;
    };
   }

  ngOnInit() {
  }
  
  uploadImage() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: 0
    }
    this.camera.getPicture(options).then((imageData) => {
      this.profileImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {});
}


 async updateUser(){
  this.presentLoading();
  this.userData.dP = await this.firebaseService.updateImage('userss', this.userData.uid, this.profileImage, 'banner');
  this.firebaseService.updateUser(this.userData.uid, this.userData);
  this.loading.dismiss();
 }

 async presentLoading() {
  this.loading = await this.loadingController.create({
    message: 'Hellooo',
    duration: 2000,
    spinner: 'bubbles'
  });
  await this.loading.present();
 }

}
