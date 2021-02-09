import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, ToastController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { RestApiService } from '../services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CreatepostPage } from '../createpost/createpost.page';
import { CommentsComponent } from '../component/comments/comments.component';
import { ReactionComponent } from '../component/reaction/reaction.component';
import { SearchComponent } from '../component/search/search.component';
import { OptionshomeComponent } from '../component/optionshome/optionshome.component';

import { React } from '../config/react';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;
  message = 'Check out the NYCWN!';
  url = 'NYCWN';

  viewtype: any;
  likebtn: boolean = true;
  dataReturned: any;
  likeBtn: boolean = true;

  value: any;
  user_id: any;
  user_url: any;
  posts: any;
  allReactionType: any;

  post_reaction: any;
  post_index: any;
  isFavorite: false;
  profile_avtar : any;

  public counter = 0;
  public react: React;
  
  constructor(public menu: MenuController,
    private auth: AuthenticationService,
    private api: RestApiService,
    private statusBar: StatusBar,
    private platform: Platform,
    private toast: ToastController,
    private router: Router,
    private alertCtrl: AlertController,
    private appCom: AppComponent,
    private socialSharing: SocialSharing,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
    //private nav: NavController
  ) {

    this.platform.ready().then(() => {
      //console.log('url:', this.router.url);
      this.backButtonEvent();
    });
    this.getUserDetils();
    this.api.presentLoading();

    this.getReactionType();
   

  }
  async getUserDetils() {
    await this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_url = res.avatar;
          this.user_id = res.id;
        }
        this.getAllActivites();

      });
  }
  async getAllActivites() {
    await this.api.get('wp-json/my-route/all_activities/'+ this.user_id)
      .subscribe(data => {
        if (data) {
          this.posts = data;
        }
        console.log('Data:', this.posts);
        this.api.dismissLoading();
      }, err => {
        console.log('erro:', err);
      });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      const alert = await this.alertCtrl.create({
        header: 'App termination',
        message: 'Do you want to close the app?',
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Application exit prevented!');
          }
        }, {
          text: 'Close App',
          handler: () => {
            navigator['app'].exitApp();
          }
        }]
      });
      await alert.present();
    });
  }
  async getReactionType() {
    await this.api.get('wp-json/my-route/v1/reactions').subscribe(data => {
      this.allReactionType = data;
      console.log(this.allReactionType);
      //console.log("--Your data--"+JSON.stringify(this.reactions));
    }, err => {
      console.log(err);
    });
  }

  async exitAppToastMsg() {
    const toastmsg = await this.toast.create({
      message: `Press back again to exit App.`,
      duration: 2000,
      position: 'top',
      cssClass: 'dark-trans exit-app-toster',
      closeButtonText: 'OK',
      showCloseButton: false
    });
    toastmsg.present();
  }

  convertNumber(Data: any) {
    return parseInt(Data);
  }


  ngOnInit() {
    this.menu.enable(true);
    this.statusBar.overlaysWebView(false);

  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  gotoUserProfile(friendid) {
    const url = '/userprofile/' + friendid + '/' + this.user_id;
    this.router.navigateByUrl(url);
  }

  doRefresh(event) {

    this.api.get('wp-json/my-route/all_activities/' + this.user_id)
      .subscribe(data => {
        this.posts = data;
        event.target.complete();
      });

  }

  async sharePicker() {
    this.platform.ready()
      .then(() => {

        this.socialSharing.share(this.message, null, null, this.url)
          .then((data) => {
            console.log('Shared via SharePicker');
          })
          .catch((err) => {
            console.log('Was not shared via SharePicker');
          });

      });
  }


  async showReactions(ev: any, postIndex) {

    //console.log(ev);
    //console.log("you have clicked the button");
    this.post_index = postIndex;
    const reactions = await this.popoverCtrl.create({
      component: ReactionComponent,
      event: ev,
      cssClass: 'contact-popover',
      backdropDismiss: true,
      showBackdrop: true,
      translucent: true,
      componentProps: { allrecation: this.allReactionType }
    });

    reactions.onDidDismiss().then(dataReturned => {
      let typeLike = dataReturned.data;
      if (typeLike > -1) {
        this.posts[this.post_index].post_reaction = typeLike;
        let act_id = this.posts[this.post_index].act_id;
        let body = {
          "reaction_type": typeLike,
          "reaction_user_id": this.user_id,
          "reaction_act_id": act_id
        };
        this.api.post('wp-json/my-route/v1/addreaction', body).subscribe(val=>{
          console.log('Success:',val);
        },err=>{
          console.log('Error:',err);
        });
      }


    });
    return await reactions.present();
  }

  async post() {
    const modal = await this.modalCtrl.create({
      component: CreatepostPage,
    });
    modal.onDidDismiss().then(v => {
      this.api.presentLoading();
      this.getAllActivites();
    });
    return await modal.present();
  }
  async postOptions(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: OptionshomeComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  async openCommentModal(post_id: number, post_author_id: number) {
    const modal = await this.modalCtrl.create({
      component: CommentsComponent,
      componentProps: {
        postId: post_id,
        postAuthor: post_author_id
      }
    });

    return await modal.present();
  }

  async searchModal() {
    const modal = await this.modalCtrl.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

}
