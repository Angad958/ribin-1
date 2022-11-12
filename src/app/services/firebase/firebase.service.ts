import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from '../db-utils';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  voucherDoc$ = new BehaviorSubject<any>(null);
  voucherSub: Subscription;
  
  transactionDoc$ = new BehaviorSubject<any>(null);
  transactionSub: Subscription;
  requestsColletion$ = new BehaviorSubject<any>(null);
  requestsSub: Subscription;
  queryLimit = 15;
  lastItem:any;
  
  constructor(private angularFirestore: AngularFirestore,
              private storageService:StorageService,
              private angularFireStorage:AngularFireStorage
    ) {}

    async updateImage(type,id, imgData, imgName){
      let imgRef = this.angularFireStorage.ref(type + '/'+ id + '/images/'+ imgName +'.png');
      await imgRef.putString(imgData,'data_url');
      let downloadURL = await imgRef.getDownloadURL().pipe(first()).toPromise();
      return downloadURL;
    }

  async getMostPopular() {
      return new Promise(async (resolve, reject) => {
          const categories = await this.angularFirestore.collection('settings').doc('mostpopular').collection('vendors', ref => ref.orderBy('createdAt', "desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
          resolve(categories);
      });
    }

    async getRecomendations() {
      return new Promise(async (resolve, reject) => {
          const categories = await this.angularFirestore.collection('settings').doc('recommendation').collection('vendors', ref => ref.orderBy('createdAt', "desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
          resolve(categories);
      });
    }

async getVednors() {
    return new Promise(async (resolve, reject) => {
      let vendors = [];
        const items:any = await this.angularFirestore.collection('vendors', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit)).snapshotChanges().pipe(first()).toPromise();
        if (items.length > 0) {
          this.lastItem = items[items.length - 1].payload.doc;
          for(const item of items) {
            vendors.push({id: item.payload.doc.id, ...item.payload.doc.data()})
         }
       }
        resolve(vendors);
    });
}

async getMoreVednors() {
  return new Promise(async (resolve, reject) => {
    let vendors = [];
      const items:any = await this.angularFirestore.collection('vendors', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit).startAfter(this.lastItem)).snapshotChanges().pipe(first()).toPromise();
      if (items.length > 0) {
        this.lastItem = items[items.length - 1].payload.doc;
        for(const item of items) {
          vendors.push({id: item.payload.doc.id, ...item.payload.doc.data()})
       }
     }
      resolve(vendors);
  });
}

async getVednorsbyCategory(cid, cname) {
  return new Promise(async (resolve, reject) => {
      const categories = await this.angularFirestore.collection('vendors', ref => ref.orderBy('createdAt', 'desc').where("categories", "array-contains", {id: cid, name: cname})).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(categories);
  });
}


async getVednorbyId(id) {
    return new Promise(async (resolve, reject) => {
        const data = await this.angularFirestore.collection('vendors').doc(id).valueChanges().pipe(first()).toPromise();
        resolve(data);
    });
}

async getVendorBranches(id) {
  return new Promise(async (resolve, reject) => {
      const categories = await this.angularFirestore.collection('vendors').doc(id).collection('branches').snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(categories);
  });
}

async getVouchersTemplates() {
    return new Promise(async (resolve, reject) => {
        const data = await this.angularFirestore.collection('voucherTemplates', ref => ref.orderBy('createdAt',"desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
        resolve(data);
    });
}


createVoucher(data) {
    return new Promise<any>(async (resolve, reject) => {
      await this.angularFirestore.collection('vouchers').add(data).then((docRef) => {
        resolve(docRef)
      });
    })
  }

  updateVoucher(id, data) {
    return new Promise<any>(async (resolve, reject) => {
      await this.angularFirestore.collection('vouchers').doc(id).update(data).then((docRef) => {
        resolve(docRef)
      });
    })
  }

  async getUserVouchers() {
    let uid =  JSON.parse(await this.storageService.getData('userData')).uid;
    return new Promise(async (resolve, reject) => {
        const data = await this.angularFirestore.collection('vouchers', ref => ref.orderBy('createdAt',"desc").where('redeemBy.uid', '==', uid)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
        resolve(data);
    });
  }

  async getUserOrders() {
    let uid =  JSON.parse(await this.storageService.getData('userData')).uid;
    return new Promise(async (resolve, reject) => {
        const data = await this.angularFirestore.collection('vouchers', ref => ref.orderBy('createdAt',"desc").where('purchaseBy.uid', '==', uid)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
        resolve(data);
    });
  }

  async subscribeVoucherbyId(id) {
    return new Promise(async (resolve, reject) => {
        this.voucherSub = this.angularFirestore.collection('vouchers').doc(id).valueChanges().subscribe((data) => {
          this.voucherDoc$.next(data);
          resolve(data);
        });  
    });
}

async getVoucherbyId(id) {
  return new Promise(async (resolve, reject) => {
      const data = await this.angularFirestore.collection('vouchers').doc(id).valueChanges().pipe(first()).toPromise();
      resolve(data);
  });
}

async getVoucherBranch(vid, bid) {
  return new Promise(async (resolve, reject) => {
      const data = await this.angularFirestore.collection('vendor').doc(vid).collection('branches').valueChanges().pipe(first()).toPromise();
      resolve(data);
  });
}

createTransaction(data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('transactions').add(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

async subscribeTransactionbyId(id) {
  return new Promise(async (resolve, reject) => {
      this.transactionSub = this.angularFirestore.collection('transactions').doc(id).valueChanges().subscribe((data) => {
        this.transactionDoc$.next(data);
        resolve(data);
      });  
  });
}

async subscribeVendorRequests() {
  let uid =  JSON.parse(await this.storageService.getData('userData')).uid;
  return new Promise(async (resolve, reject) => {
    this.requestsSub = this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', "desc").where('paidTo', '==', uid)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).subscribe(data => {
      this.requestsColletion$.next(data);  
      resolve(data);
      })
  });
}

updateTransaction(id, data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('transactions').doc(id).update(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

async getUserTransactions() {
  let uid =  JSON.parse(await this.storageService.getData('userData')).uid;
  return new Promise(async (resolve, reject) => {
      const data = await this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', 'desc').where('paidBy.uid', '==', uid)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(data);
  });
}



async getAllVouchers() {
  return new Promise(async (resolve, reject) => {
      let vouchers =[];
      const items:any = await this.angularFirestore.collection('vouchers', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit)).snapshotChanges().pipe(first()).toPromise();
      if (items.length > 0) {
        this.lastItem = items[items.length - 1].payload.doc;
        for(const item of items) {
          vouchers.push({id: item.payload.doc.id, ...item.payload.doc.data()})
       }
     }
      resolve(vouchers);
  });
}

async getMoreAllVouchers() {
  return new Promise(async (resolve, reject) => {
      let vouchers =[];
      const items:any = await this.angularFirestore.collection('vouchers', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit).startAfter(this.lastItem)).snapshotChanges().pipe(first()).toPromise();
      if (items.length > 0) {
        this.lastItem = items[items.length - 1].payload.doc;
        for(const item of items) {
          vouchers.push({id: item.payload.doc.id, ...item.payload.doc.data()})
       }
     }
      resolve(vouchers);
  });
}

async getAllTransactions() {
  return new Promise(async (resolve, reject) => {
    let transactions =[];
      const items:any = await this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit)).snapshotChanges().pipe(first()).toPromise();
      if (items.length > 0) {
         this.lastItem = items[items.length - 1].payload.doc;
         for(const item of items) {
          transactions.push({id: item.payload.doc.id, ...item.payload.doc.data()})
        }
      }
      resolve(transactions);
  });
}

async getMoreAllTransactions() {
  return new Promise(async (resolve, reject) => {
    let transactions =[];
      const items:any = await this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', 'desc').limit(this.queryLimit).startAfter(this.lastItem)).snapshotChanges().pipe(first()).toPromise();
      if (items.length > 0) {
         this.lastItem = items[items.length - 1].payload.doc;
         for(const item of items) {
          transactions.push({id: item.payload.doc.id, ...item.payload.doc.data()})
        }
      }
      //let data = {'lastItem':lastItem,'transactions':transactions}
      resolve(transactions);
  });
}

createVendor(data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').add(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

updateVendor(id, data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').doc(id).update(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

deleteVendor(id) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').doc(id).delete().then((docRef) => {
      resolve(docRef)
    });
  })
}

createBranch(id,data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').doc(id).collection('branches').add(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

updateBranch(vid,bid,data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').doc(vid).collection('branches').doc(bid).update(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

deleteBranch(vid,bid) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('vendors').doc(vid).collection('branches').doc(bid).delete().then((docRef) => {
      resolve(docRef)
    });
  })
}


async getUserbyPhoneEmail(email) {
  return new Promise(async (resolve, reject) => {
      const user = await this.angularFirestore.collection('users', ref => ref.orderBy('createdAt', 'desc').where('email', '==', email)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(user);
  });
}

updateUser(id, data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('users').doc(id).update(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

async getVendorBranchesbyCity(id,cities) {
  return new Promise(async (resolve, reject) => {
      const branches = await this.angularFirestore.collection('vendors').doc(id).collection('branches', ref => ref.where('city.id', 'in', cities)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(branches);
  });
}

async getVendorTransactions() {
  let user =  await JSON.parse(await this.storageService.getData('userData'));
  return new Promise(async (resolve, reject) => {
      const transactions = await this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', 'desc').where('branch.id', '==', user.assignedBranch)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(transactions);
  });
}

async getVendorTransactionsbyDate(startDate, endDate){
  let user =  await JSON.parse(await this.storageService.getData('userData'));
  return new Promise(async (resolve, reject) => {
      const transactions = await this.angularFirestore.collection('transactions', ref => ref.orderBy('createdAt', 'desc').where('branch.id', '==', user.assignedBranch).where('createdAt', '>', startDate).where('createdAt', '<', endDate)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(transactions);
  });
}

async getVendorVouchers() {
  let user =  await JSON.parse(await this.storageService.getData('userData'));
  return new Promise(async (resolve, reject) => {
      const transactions = await this.angularFirestore.collection('vouchers', ref => ref.orderBy('createdAt', 'desc').where('vendorDetails.id', '==', user.assignedVendor)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(transactions);
  });
}

async getCities() {
  return new Promise(async (resolve, reject) => {
      const categories = await this.angularFirestore.collection('cities', ref => ref.orderBy('createdAt', "desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(categories);
  });
}

async createCity(item) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('cities').add(item).then((docRef) => {
      resolve(docRef)
    });
  })
}

async updateCity(id, item) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('cities').doc(id).update(item).then((docRef) => {
      resolve(docRef)
    });
  })
}

async getAllCategories() {
  return new Promise(async (resolve, reject) => {
      const categories = await this.angularFirestore.collection('categories', ref => ref.orderBy('createdAt', "desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(categories);
  });
}

async getCategorybyId(id) {
return new Promise(async (resolve, reject) => {
    const data = await this.angularFirestore.collection('categories').doc(id).valueChanges().pipe(first()).toPromise();
    resolve(data);
});
}

async createCategory(item) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').add(item).then((docRef) => {
      resolve(docRef)
    });
  })
}

async deleteCategory(id) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').doc(id).delete().then((docRef) => {
      resolve(docRef)
    });
  })
}

async updateCategory(id, data) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').doc(id).update(data).then((docRef) => {
      resolve(docRef)
    });
  })
}

async getAllSubCategories(ID) {
return new Promise(async (resolve, reject) => {
    const subCategories = await this.angularFirestore.collection('categories').doc(ID).collection('subCategories', ref => ref.orderBy('createdAt',"desc")).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
    resolve(subCategories);
});
}

async createSubCategory(cid, item) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').doc(cid).collection('subCategories').add(item).then((docRef) => {
      resolve(docRef)
    });
  })
}

async updateSubCategory(cid,sid, item) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').doc(cid).collection('subCategories').doc(sid).update(item).then((docRef) => {
      resolve(docRef)
    });
  })
}

async deleteSubCategory(cid,sid,) {
  return new Promise<any>(async (resolve, reject) => {
    await this.angularFirestore.collection('categories').doc(cid).collection('subCategories').doc(sid).delete().then((docRef) => {
      resolve(docRef)
    });
  })
}

async searchVendors(searchTerm: string){
  return new Promise(async (resolve, reject) => {
      const searchResult = await this.angularFirestore.collection('vendors', ref => ref.orderBy('createdAt', 'desc').where('name', '==', searchTerm)).snapshotChanges().pipe(map(snaps => convertSnaps(snaps))).pipe(first()).toPromise();
      resolve(searchResult);
  });
}

}