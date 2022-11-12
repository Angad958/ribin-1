import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  text: string='Flamenco\n'
  imgurl:string= 'https://cdn.pixabay.com/photo/2019/12/26/05/10/pink-4719682_960_720.jpg'
  link: string='https://link.medium.com/JA4amAHFJ5'

  constructor(private socialSharing: SocialSharing,private platform:Platform) { }

  ngOnInit() {
  }

  onShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link).then(() => {
  }).catch((err) => {
  });
 }

 onShareEmail(){
  this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com']).then(() => {
}).catch((err) => {
});
}

onShareSMS(){
  this.socialSharing.shareViaSMS('Hello https://www.youtube.com/', '').then(() => {
}).catch((err) => {
});
}

}
