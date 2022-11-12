import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit  {
  subCategories;
  vendors;
  catgID;
  categoryData;
  activeSubCatg;
   constructor(private firebaseService:FirebaseService,
               private activatedRoute:ActivatedRoute,
     ) { }
 
   async ngOnInit() {
     this.catgID = this.activatedRoute.snapshot.paramMap.get('id');
     this.categoryData = await this.firebaseService.getCategorybyId(this.catgID);
     let catName = this.categoryData.name
     this.subCategories = await this.firebaseService.getAllSubCategories(this.catgID);
     this.vendors = await this.firebaseService.getVednorsbyCategory(this.catgID, catName);
   }

   async onClickSubCategory(item){
    this.activeSubCatg = item;
    let id = item.id;
    let name = item.name;
    this.vendors = '';
    this.vendors = await this.firebaseService.getVednorsbyCategory(id, name);
   }


 
 }
 
