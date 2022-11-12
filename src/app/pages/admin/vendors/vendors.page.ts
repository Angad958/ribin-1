import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.page.html',
  styleUrls: ['./vendors.page.scss'],
})
export class VendorsPage implements OnInit {
  vendors;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  currenyCode;
  showLoadMore = true;
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.currenyCode = environment.currencyCode;
  }

  async ionViewWillEnter() {
    this.vendors = await this.firebaseService.getVednors();
    if (this.vendors.length < 15) {
      this.showLoadMore = false;
    }
    
  }

  async loadMore(event){
    let vendors:any = await this.firebaseService.getMoreAllTransactions();
    this.vendors = [...this.vendors, ...vendors];
    event.target.complete();
    if (vendors.length < 15) {
      event.target.disabled = true;
    }
   }

  createVendor(){
    this.router.navigate(['create-vendor']);
  }

  editVendor(item){
    this.router.navigate(['create-vendor', item.id]);
  }

}
