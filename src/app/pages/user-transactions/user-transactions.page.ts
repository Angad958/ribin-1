import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.page.html',
  styleUrls: ['./user-transactions.page.scss'],
})
export class UserTransactionsPage implements OnInit {
  transactions;
  currenyCode;
  skeletonTextArray = [1,1,3,4,5,6,7,8,9,10,11,12,13];

  constructor(private firebaseService:FirebaseService) { }

  async ngOnInit() {
    this.currenyCode = environment.currencyCode;
    this.transactions = await this.firebaseService.getUserTransactions();
  }

}
