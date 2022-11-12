import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  requests;
  currencyCode;

  constructor(private alertController: AlertController,
             private firebaseService:FirebaseService,
    ) { }

  ngOnInit() {
    this.currencyCode = environment.currencyCode;
  }

  ionViewWillEnter() {
    this.requests = this.firebaseService.subscribeVendorRequests();
    this.firebaseService.requestsColletion$.subscribe(data => {
      this.requests = data;
    });
  }

  ionViewWillLeave() {
    this.firebaseService.requestsSub.unsubscribe();
    this.firebaseService.requestsColletion$.unsubscribe();
  }

  async onStatusChange(id) {
    const alert = await this.alertController.create({
      message: 'Perform the action',
      buttons: [
        {
          text: 'Reject',
          role: 'cancel',
          handler: () => { this.firebaseService.updateTransaction(id,{'status':'delined'}); }
        },
        {
          text: 'Approved',
          role: 'approved',
          handler: () => { this.firebaseService.updateTransaction(id,{'status':'approved'}); }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
