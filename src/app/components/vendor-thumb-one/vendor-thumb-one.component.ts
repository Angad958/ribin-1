import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-thumb-one',
  templateUrl: './vendor-thumb-one.component.html',
  styleUrls: ['./vendor-thumb-one.component.scss'],
})
export class VendorThumbOneComponent implements OnInit {
  @Input() data: any;
  constructor(private router: Router) { }

  ngOnInit() {}

  onClick(item: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        data:item,
      }
};
    this.router.navigate(['buy-vendor-voucher', item.id], navigationExtras);
  }

}
