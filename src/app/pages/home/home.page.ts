import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories:any;
  vednors:any;
  mostPopular:any;
  recomendations:any;
  constructor(private firebaseService:FirebaseService,private router:Router) { }

  async ngOnInit() {
    this.categories = await this.firebaseService.getAllCategories();
    this.vednors = await this.firebaseService.getVednors();
    this.mostPopular = await this.firebaseService.getMostPopular();
    this.recomendations = await this.firebaseService.getRecomendations();
  }

  goToSearchResults(searchTerm: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        data:searchTerm,
      }
};
    
    this.router.navigate(['search-page',searchTerm ], navigationExtras);
  }

}
