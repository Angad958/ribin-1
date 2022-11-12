import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = ['Yay You’ve got a Gift Card!','Yay You’ve got a Gift Card!','Yay You’ve got a Gift Card!','Yay You’ve got a Gift Card!','Yay You’ve got a Gift Card!'];
  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['gift-card']);
  }

}
