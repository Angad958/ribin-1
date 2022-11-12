import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  @ViewChild('catgForm') catgForm: NgForm;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  loading:any;
  catgID;
  categoryData:any = {
    name: '',
  }
  subCategories:any = [];
  currentSubCatg:any = {
    name: '',
  }
  SubCatg = false;
  isModalOpen = false;
  editSubCatg = false;
  mode = 'new';
  constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private firebaseService:FirebaseService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resetSubCatg(){
    this.currentSubCatg = {
      name: '',
    }
  }

  async ionViewWillEnter() {
    this.presentLoading();
    this.currentSubCatg.createdAt =  new Date();
    let catgID = this.activatedRoute.snapshot.paramMap.get('id');
    if (catgID) {
      this.mode = 'edit';
      this.catgID = catgID;
      this.categoryData = await this.firebaseService.getCategorybyId(this.catgID);
      this.subCategories = await this.firebaseService.getAllSubCategories(this.catgID);
      this.loading.dismiss();   
    }
    else{
      this.loading.dismiss();
    }
    
  }

  createSubCatgModal(){
    this.isModalOpen = true;
  }

  async createSubCatg(){
    this.presentLoading();
    let catg = await this.firebaseService.createSubCategory(this.catgID, this.currentSubCatg);
    this.currentSubCatg.id = catg.id;
    this.subCategories.push(this.currentSubCatg);
    this.loading.dismiss();
    this.isModalOpen = false;
    this.presentToast('Sub Category has been created successfully');
    this.resetSubCatg(); 
  }

  updateSubCatgModal(item){
   this.currentSubCatg = item;
   this.editSubCatg = true;
   this.isModalOpen = true;
  }

  async updateSubCatg(){
    let sid = this.currentSubCatg.id;
    delete this.currentSubCatg.id;
    await this.firebaseService.updateSubCategory(this.catgID,sid,this.currentSubCatg);
    this.loading.dismiss();
    this.isModalOpen = false;
    this.editSubCatg = false;
    this.presentToast('Sub Category has been updated successfully');
    this.resetSubCatg(); 
  }

  async createCategory(){
    this.presentLoading();
    this.categoryData.createdAt =  new Date();
    let catg:any = await this.firebaseService.createCategory(this.categoryData);
    this.catgID = catg.id;
    this.mode = 'edit';
    this.loading.dismiss();
    this.presentToast("Category created successfully");
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000,
    });
    await this.loading.present();
  }

  closeModal(){
    this.isModalOpen = false;
    this.editSubCatg  = false;
    this.resetSubCatg();
  }

  async deleteCategoryAlert() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this Category',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete',
          handler: () => {
           this.deleteCatg();
          }
        }
      ]
    });
    await alert.present();
  }


  async updateCategory(){
    this.presentLoading();
    await this.firebaseService.updateCategory(this.catgID, this.categoryData);
    this.loading.dismiss();
    this.presentToast('Category deleted successfully');

  }

  async deleteCatg() {
    this.presentLoading();
    await this.firebaseService.deleteCategory(this.catgID);
    this.loading.dismiss();
    this.presentToast('Category deleted successfully');
    this.router.navigate(['categories-list']);
}

async deleteSubCatgAlert(i, item) {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete this Sub Category',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Delete',
        handler: () => {
         this.deleteSubCatg(i, item);
        }
      }
    ]
  });
  await alert.present();
}

async deleteSubCatg(i, item){
  await this.firebaseService.deleteSubCategory(this.catgID,item.id);
  this.subCategories.splice(i, 1);
  this.loading.dismiss();
  this.isModalOpen = false;
  this.editSubCatg = false;
  this.presentToast('Sub Category has been deleted successfully'); 
}

}
