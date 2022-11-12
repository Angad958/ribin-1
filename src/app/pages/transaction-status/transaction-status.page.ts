import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-transaction-status',
  templateUrl: './transaction-status.page.html',
  styleUrls: ['./transaction-status.page.scss'],
})
export class TransactionStatusPage implements OnInit {
  transactionID: string;
  transactionData;
  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router) { }

  async ngOnInit() {
    this.transactionID = this.activatedRoute.snapshot.paramMap.get('id');
    this.transactionData = await this.firebaseService.subscribeVoucherbyId(this.transactionID);
    this.firebaseService.voucherDoc$.subscribe(data => {
      this.transactionData = data;
    });
  }

  ngOnDestroy() {
    this.firebaseService.transactionDoc$.unsubscribe();
    this.firebaseService.transactionSub.unsubscribe();
  }

}
