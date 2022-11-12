import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-carousel',
  templateUrl: './categories-carousel.component.html',
  styleUrls: ['./categories-carousel.component.scss'],
})
export class CategoriesCarouselComponent implements OnInit {
  @Input() data: any;
  constructor(private router:Router) { }

  ngOnInit() {}
  onClickItem(id){
    this.router.navigate(['category', id]);
  }

}
