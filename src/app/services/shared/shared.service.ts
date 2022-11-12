import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loading: any;
  constructor(private loadingController: LoadingController) {}

  async presentLoading(msg = 'Please wait...') {
    this.loading = await this.loadingController.create({
        message: msg
    });
    await this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss()
  }

  

}
