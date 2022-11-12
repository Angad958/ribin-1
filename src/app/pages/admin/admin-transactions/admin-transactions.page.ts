import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.page.html',
  styleUrls: ['./admin-transactions.page.scss'],
})
export class AdminTransactionsPage implements OnInit {
  transactions;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  currenyCode;
  showLoadMore = true;
  //noMoreTransactions =

  
   constructor(
     private firebaseService: FirebaseService,
   ) { }
 
   ngOnInit() {
     this.currenyCode = environment.currencyCode;
   }
 
   async ionViewWillEnter() {
     this.transactions = await this.firebaseService.getAllTransactions();
     if (this.transactions.length < 15) {
        this.showLoadMore = false;
     }
   }


   async loadMore(event){
    let transactions:any = await this.firebaseService.getMoreAllTransactions();
    this.transactions = [...this.transactions, ...transactions];
    if (transactions.length < 15) {
      event.target.disabled = true;
    }
   }

  //  async loadMoreTransactions(){
  //   let moreTransactions:any = await this.firebaseService.getMoreAllTransactions();
  //   this.transactions = [...this.transactions, ...moreTransactions];
  //   if (moreTransactions.length < 15) {
  //     event.target.disabled = true;
  //   }
  //  }

 
 }
 
