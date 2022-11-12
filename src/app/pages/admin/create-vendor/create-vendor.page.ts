import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.page.html',
  styleUrls: ['./create-vendor.page.scss'],
})
export class CreateVendorPage implements OnInit {
  @ViewChild('vendorForm') vendorForm: NgForm;
  @ViewChild('branchForm') branchForm: NgForm;
  categories;
  subCategories;
  cities: any = [];
  bannerImage;
  logoImage;
  loading;
  isBranchModalOpen = false;
  isCityModalOpen = false;
  isUserModalOpen = false;
  branches: any = [];
  //vendorCategories = [];
  mode = 'new';
  vendorID;
  pageTitle = 'Create Title'
  vendorData: any = {
      name: '',
      categories: [{
          id: '',
          name: ''
      }, {
          id: '',
          name: ''
      }],
      category: {
          id: '',
          name: ''
      },
      subCategory: {
          id: '',
          name: ''
      },
      cities: [],
      minVoucherAmount: 0,
      maxVoucherAmount: 0,
      predefineVoucherAmount: [{
          value: 0
      }],
      bannerImage: '',
      logoImage: '',
      createdAt: new Date(),

  }
  currentBranch: any = {
      name: '',
      address: '',
      city: {
          id: '',
      },
      assignedUser: {
          'phoneNo': ''
      },
  }
  editBranch = false;

  constructor(private firebaseService: FirebaseService,
      private loadingController: LoadingController,
      private toastController: ToastController,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private alertController: AlertController,
      private camera: Camera) {}

  async ngOnInit() {
    
      
  }

  async ionViewWillEnter() {
    this.presentLoading();
      this.categories = await this.firebaseService.getAllCategories();
      let vendorID = this.activatedRoute.snapshot.paramMap.get('id');
      this.cities = await this.firebaseService.getCities();
      if (vendorID) {
          this.pageTitle = "Edit Title";
          this.mode = 'edit';
          this.vendorID = vendorID;
          this.vendorData = await this.firebaseService.getVednorbyId(vendorID);
          if (this.vendorData.categories[0].id) {
              this.subCategories = await this.firebaseService.getAllSubCategories(this.vendorData.categories[0].id);
          }
          this.setSelectedCities();
          this.branches = await this.firebaseService.getVendorBranches(this.vendorID);
          this.loading.dismiss();
      }
      else{
        this.loading.dismiss();
      }
  }

  categoryChange(event) {
      let item = this.categories.find(item => item.id === event.target.value);
      this.vendorData.categories[0] = {'id': item.id, 'name': item.name};
      this.getsubCategories(event.target.value);
  }

  async getsubCategories(id) {
      this.subCategories = '';
      this.subCategories = await this.firebaseService.getAllSubCategories(id);
  }

  subCategoryChange(event) {
      let item = this.subCategories.find(item => item.id === event.target.value);
      this.vendorData.categories[1] = {'id': item.id, 'name': item.name}
  }



  uploadImage(type) {
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: 0
      }
      this.camera.getPicture(options).then((imageData) => {
          if (type == 'banner') {
              this.bannerImage = 'data:image/jpeg;base64,' + imageData;
          } else if (type == 'logo') {
              this.logoImage = 'data:image/jpeg;base64,' + imageData;
          }
      }, (err) => {});
  }

  async presentLoading() {
      this.loading = await this.loadingController.create({
          message: 'Please wait...',
          spinner: 'bubbles'
      });
      await this.loading.present();
  }

  dismissLoading() {
      this.loading.dismiss();
  }

  async presentToast(msg) {
      const toast = await this.toastController.create({
          message: msg,
          duration: 2000
      });
      toast.present();
  }

  setBranchModalOpen(isOpen: boolean) {
      this.isBranchModalOpen = isOpen;
  }

  async findUser(number) {


  }

  presentAddBranchModal(){
    this.setBranchModalOpen(true);
    this.resetCurrentBranch();

  }

  async addBranch() {
    this.presentLoading();
     this.currentBranch.cityId = this.currentBranch.city.id;
      let user: any = await this.firebaseService.getUserbyPhoneEmail(this.currentBranch.assignedUser.email);
      if (user && user.length > 0) {
          let assignedUser = user[0];
          this.currentBranch.assignedUser = {
              'id': assignedUser.id,
              'email': assignedUser.email,
              'phoneNo': assignedUser.phoneNo,
              'name': assignedUser.name
          }

          if (this.mode === 'edit') {
              let branch = await this.firebaseService.createBranch(this.vendorID, this.currentBranch);
              this.currentBranch.id = branch.id;
          }
          this.branches.push(this.currentBranch);
          this.setBranchModalOpen(false);
          this.loading.dismiss();
          this.presentToast('Branches added successfully');
          //this.resetCurrentBranch();
      } else {
          this.presentToast('User not found');
      }

  }

  async updateBranch() {
    this.presentLoading();
      let user: any = await this.firebaseService.getUserbyPhoneEmail(this.currentBranch.assignedUser.email);

      if (user && user.length > 0) {
          let assignedUser = user[0];
          this.currentBranch.assignedUser = {
              'id': assignedUser.id,
              'email': assignedUser.email,
              'phoneNo': assignedUser.phoneNo,
              'name': assignedUser.name
          }

          if (this.mode === 'edit') {
            await this.firebaseService.updateBranch(this.vendorID, this.currentBranch.id, this.currentBranch);
          }
          this.loading.dismiss();
          this.setBranchModalOpen(false);
          this.editBranch = false;
          this.presentToast('Branches updated successfully');
      } else {
          this.presentToast('User not found');
      }
  }

  async deleteBranch(i, item) {
      if (this.mode === 'edit') {
          await this.firebaseService.deleteBranch(this.vendorID, item.id)
      }
      this.branches.splice(i, 1);
      this.presentToast('Branches deleted successfully');
  }

  addAmount() {
      this.vendorData.predefineVoucherAmount.push({
          value: 0
      });
  }

  removeAmount(i) {
      this.vendorData.predefineVoucherAmount.splice(i, 1);
  }

  presentBranchModal(item) {
      this.editBranch = true;
      this.currentBranch = item;
      this.setBranchModalOpen(true);
  }

  setCityModalOpen(isOpen: boolean) {
      this.isCityModalOpen = isOpen;
  }

  updateCities() {
      this.vendorData.cities = this.cities.filter(item => item.isChecked);
      this.setCityModalOpen(false);
  }

  moderateCities() {
      this.vendorData.cities.forEach((item) => {
          delete item.isChecked;
      });
  }

  setUserModalOpen(isOpen: boolean) {
      this.isUserModalOpen = isOpen;
  }

  setSelectedCities() {
      this.cities.forEach((item) => {
          const id = obj => obj.id === item.id;
          item.isChecked = this.vendorData.cities.some(id);
      });
  }

  onChangeBranchCity(event) {
      this.currentBranch.city = this.vendorData.cities.find(item => item.id === event.target.value);
      this.getsubCategories(event.target.value);
  }
  
  onDeletBanner(){
    this.bannerImage = '';
    this.vendorData.bannerImage = '';
  }
  onDeletLogo(){
    this.logoImage = '';
    this.vendorData.logoImage = '';
  }
  async createVendor() {
      this.moderateCities();
      this.presentLoading();
      let vendor = await this.firebaseService.createVendor(this.vendorData);
      this.branches.forEach(async (element, index) => {
          let branch = await this.firebaseService.createBranch(vendor.id, element)
      });
      if (this.bannerImage) {
          let vendorImageURL = await this.firebaseService.updateImage('vendors', vendor.id, this.bannerImage, 'banner');
          let updatedVoucher = await this.firebaseService.updateVendor(vendor.id, {
              'bannerImage': vendorImageURL
          });
      }
      if (this.logoImage) {
          let logoImageURL = await this.firebaseService.updateImage('vendors', vendor.id, this.bannerImage, 'logo');
          let updatedVoucher = await this.firebaseService.updateVendor(vendor.id, {
              'logoImage': logoImageURL
          });
      }
      this.dismissLoading();
      this.mode = 'edit';
      this.pageTitle = 'Edit Vendor';
     
      this.presentToast('Vendor Saved');
      this.router.navigate(['tabs/admin-vendors']);
  }


  async updateVendor() {
      this.moderateCities();
      this.presentLoading();
      if (this.bannerImage) {
        this.vendorData.bannerImage = await this.firebaseService.updateImage('vendors', this.vendorID, this.bannerImage, 'banner');
      }
      if (this.logoImage) {
          this.vendorData.logoImage  = await this.firebaseService.updateImage('vendors', this.vendorID, this.bannerImage, 'logo');
      }
      let update = await this.firebaseService.updateVendor(this.vendorID, this.vendorData);
      this.loading.dismiss();
      this.presentToast('Vendor Updated successfully');
      this.setSelectedCities();
  }

  async deleteVendor() {
      this.presentLoading();
      await this.firebaseService.deleteVendor(this.vendorID);
      this.loading.dismiss();
      this.presentToast('Vendor deleted successfully');
      this.router.navigate(['tabs/admin-vendors']);
  }

  async deleteVendorAlert() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete this vendor',
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
           this.deleteVendor();
          }
        }
      ]
    });
    await alert.present();
  }

  

  resetCurrentBranch(){
    this.currentBranch = {
        name: '',
        address: '',
        city: {
            id: '',
        },
        assignedUser: {
            'email': ''
        },
    }
  }
}