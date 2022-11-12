import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {
  categories:any;
  constructor(private firebaseService:FirebaseService, private router:Router) { }

  async ngOnInit() {
    this.categories = await this.firebaseService.getAllCategories();
  }

  onClickItem(id){
    this.router.navigate(['category', id]);
  }

}
