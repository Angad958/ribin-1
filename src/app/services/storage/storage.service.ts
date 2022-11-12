import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageReady = new BehaviorSubject(false);
  constructor(private storage: Storage) {
    this.init()
   }

  async init(){
    await this.storage.create();
    this.storageReady.next(true);
  }

  async getData(key){
    return await this.storage.get(key) || [];
  }

  async addData(key, item){
    const storedData = await this.storage.get(key) || [];
    storedData.push(item);
    return this.storage.set(key, storedData);
  }

  async setData(key, data){
    return this.storage.set(key, data);
  }

}
