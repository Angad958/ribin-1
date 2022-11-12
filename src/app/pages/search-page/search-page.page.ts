import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  searchTerm;
  searchResult:any;
  constructor(private router: Router,private firebaseService:FirebaseService, private activatedRoute: ActivatedRoute,) { }

  async ngOnInit() {
    
  }

  async ionViewWillEnter() {
    this.searchTerm = this.activatedRoute.snapshot.paramMap.get('text');
    this.searchResult = await this.firebaseService.searchVendors(this.searchTerm);
    
  }

}
