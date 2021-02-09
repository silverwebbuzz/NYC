import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  message = 'Check out the NYCWN!';
  url = '';

  constructor(private navCtrl: NavController,
    private platform: Platform,
    private socialSharing: SocialSharing,) { }

  ngOnInit() {
  }

  goToBack(){
    this.navCtrl.back();
  }

  async sharePicker()
   {
      this.platform.ready()
      .then(() =>
      {

         this.socialSharing.share(this.message, null, null, this.url)
         .then((data) =>
         {
            console.log('Shared via SharePicker');
         })
         .catch((err) =>
         {
            console.log('Was not shared via SharePicker');
         });

      });
   }

}
