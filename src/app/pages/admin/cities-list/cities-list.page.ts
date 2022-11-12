import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.page.html',
  styleUrls: ['./cities-list.page.scss'],
})
export class CitiesListPage implements OnInit {
  currentCity:any = {};
  editCity = false;
  cities;
  isModalOpen = false;
  loading;
  skeletonArray = [1,2,3,4,5,6,7,8,9,10];
  constructor(
    private firebaseService: FirebaseService,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) { }


  ngOnInit() {
  }

  resetCity(){
    this.currentCity = {};
  }

  async ionViewWillEnter() {
    this.cities = await this.firebaseService.getCities();
  }

  editCityModal(item){
    this.isModalOpen = true;
    this.editCity = true;
    this.currentCity = item;
  }

  async updateCity(){
    let id = this.currentCity.id;
    delete this.currentCity.id;
    await this.firebaseService.updateCity(id, this.currentCity);
    this.isModalOpen = false;
    this.editCity = true;
    this.resetCity();
    this.presentToast('City updated successfully.');
  }

  createCityModal(){
    this.isModalOpen = true;
  }

  createCity(){
    this.currentCity.createdAt = new Date();
    let city:any = this.firebaseService.createCity(this.currentCity);
    this.currentCity.id = city.id;
    this.cities.push(this.currentCity);
    this.isModalOpen = false;
    this.resetCity();
    this.presentToast('City created successfully.');
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
      message: 'please wait...',
      duration: 2000,
    });
    await this.loading.present();
  }

  closeModal(){
    this.isModalOpen = false;
    this.resetCity();
  }
}
