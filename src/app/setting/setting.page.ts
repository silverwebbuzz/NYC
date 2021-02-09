import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

    async deleteProfile() {
      const alert = await this.alertCtrl.create({
        header: 'Confirm Delete ?',
        message: 'Are you sure you want to delete your Profile ?',
        //subHeader: 'This will remove all of your posts, saved information and delete your account.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Delete',
            handler: () => {
            }
          }
        ]
      });
      await alert.present();
    }

}
