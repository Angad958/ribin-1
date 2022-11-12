import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.page.html',
  styleUrls: ['./categories-list.page.scss'],
})
export class CategoriesListPage implements OnInit {
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  categories:any;
  constructor(private firebaseService: FirebaseService,private router: Router) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.categories = await this.firebaseService.getAllCategories();
  }

  editCategoty(item){
    this.router.navigate(['edit-category', item.id]);
  }
  createCatgPage(){
    this.router.navigate(['edit-category']);
  }

}
