import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit {
  orders;
  currenyCode;
  skeletonTextArray = [1,1,3,4,5,6,7,8,9,10,11,12,13];

  constructor(private firebaseService:FirebaseService) { }

  async ngOnInit() {
    this.currenyCode = environment.currencyCode;
    this.orders = await this.firebaseService.getUserOrders();
  }

}
