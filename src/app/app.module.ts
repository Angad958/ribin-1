import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuPage } from './pages/sidemenu/sidemenu.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
// import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { AllInOneSDK } from '@awesome-cordova-plugins/all-in-one-sdk/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';


@NgModule({
  declarations: [AppComponent,SidemenuPage],
  imports: [BrowserModule,FormsModule,
            IonicModule.forRoot(),
            AngularFireModule.initializeApp(environment.firebaseConfig),
            IonicStorageModule.forRoot(
              {
                name:'ribin-app'
              }
            ),
            AngularFirestoreModule,
            AngularFireAuthModule,
            AppRoutingModule],
  providers: [
    SocialSharing,
    FirebaseDynamicLinks,
    AllInOneSDK,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
