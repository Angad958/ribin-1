import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

 
  private values: string[] = ['week', 'month', 'year'];
  transactions;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  currenyCode;
  segmentModel = 'overview';
  weekTransactions;
  weekTotal = 0;
  monthTransactions;
  monthTotal = 0;
  yearTransactions;
  yearTotal = 0;
  todayDate = new Date();
  
   constructor(
     private firebaseService: FirebaseService,
   ) { }
 
   ngOnInit() {
     this.currenyCode = environment.currencyCode;
   }
 
   async ionViewWillEnter() {
     this.transactions = await this.firebaseService.getVendorTransactions();
    
     
   }

   getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  segmentChanged(event){}

  async getWeekTransactions(){
    let startDate = this.getMonday(this.todayDate);
    this.weekTransactions = await this.firebaseService.getVendorTransactionsbyDate(startDate,this.todayDate);
    this.weekTransactions.forEach((element) => {
      this.weekTotal += element.amount;
  });
  }
  async getMonthTransactions(){
    let y = this.todayDate.getFullYear(), m = this.todayDate.getMonth();
    let startDate = new Date(y, m, 1);
    this.monthTransactions = await this.firebaseService.getVendorTransactionsbyDate(startDate,this.todayDate);
    this.monthTransactions.forEach((element) => {
      this.monthTotal += element.amount;
  });
  }

  async getYearTransactions(){
    let startDate = new Date(new Date().getFullYear(), 0, 1);
    this.yearTransactions = await this.firebaseService.getVendorTransactionsbyDate(startDate,this.todayDate);
    this.yearTransactions.forEach((element) => {
      this.yearTotal += element.amount;
  });
  }

  accordionGroupChange = (ev: any) => {
    const selectedValue = ev.detail.value;
    if (selectedValue == 'week' && !this.weekTotal) {
      this.getWeekTransactions();
    }
    if (selectedValue == 'month' && !this.monthTotal) {
      this.getMonthTransactions();
    }
    if (selectedValue == 'year' && !this.yearTotal) {
      this.getYearTransactions();
    }
  };
 
 }
 
