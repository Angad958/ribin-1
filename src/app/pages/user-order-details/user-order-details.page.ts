import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.page.html',
  styleUrls: ['./user-order-details.page.scss'],
})
export class UserOrderDetailsPage implements OnInit {
  orderID;
  orderData;
  currencyCode;

  constructor(private activatedRoute:ActivatedRoute,private firebaseService:FirebaseService, ) { }

  async ngOnInit() {
    this.currencyCode = environment.currencyCode;
    this.orderID = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderData = await this.firebaseService.getVoucherbyId(this.orderID);
  }

}
