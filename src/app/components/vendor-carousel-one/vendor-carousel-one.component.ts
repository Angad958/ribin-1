import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-carousel-one',
  templateUrl: './vendor-carousel-one.component.html',
  styleUrls: ['./vendor-carousel-one.component.scss'],
})
export class VendorCarouselOneComponent implements OnInit {
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
