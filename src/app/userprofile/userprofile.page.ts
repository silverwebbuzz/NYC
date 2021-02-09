import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { RestApiService } from '../services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CreatepostPage } from '../createpost/createpost.page';
import { PrivacyComponent } from '../component/privacy/privacy.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  tabs: string = "timeline";
  btnHide: boolean = false;
  tabView: boolean = true;
  postTextArea : boolean = true;
  photoArea : boolean = false;
  videoArea : boolean = false;

  PostTab : boolean = true;
  VideoTab : boolean = false;
  PhotoTab : boolean = false;

  frdid : any;
  user_url : any;

  user_avatar : any;
  user_name : any;
  user_location : any;
  user_badges : any;
  user_genres : any;
  user_id : any;
  user_cover_photo : any;
  user_post : any = [];
  user_meta : any;
  user_frnd_status : any = '';

  networkType: string = 'Public';

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: RestApiService,
    public menu: MenuController,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private modalController: ModalController) {

      console.log("hello");
     }

  ngOnInit() {
    this.frdid = this.route.snapshot.paramMap.get('frdid');
    this.menu.enable(true);
    this.statusBar.overlaysWebView(false);
    this.api.presentLoading();
    this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_url = res.avatar;
          this.user_id = res.id;
        }
      });
      this.getapiCall();
      this.networkTypeStateStore();
  }

  networkTypeStateStore(){
    this.auth.NetworktypeState.subscribe(v => {
      console.log('v:',v);
      this.networkType = v;
    });
}

  sendFriendReq(){
    this.api.presentLoading();
    const body = {
      friend_id : this.frdid,
      user_id : this.user_id
    }
    this.api.post('wp-json/my-route/v1/sendrequests',body)
    .subscribe(data =>{
      this.getapiCall(); 
    })
  }

  getapiCall(){
          
      this.api.get('wp-json/my-route/v1/user_details/' + this.frdid + '/' + this.user_id)
      .subscribe(data => {
        if(data){
          console.log("logData",data);  
          this.user_avatar = data.user_data.avatarimg;
          this.user_name = data.user_data.username;
          this.user_location = data.user_data.location;
          this.user_badges = data.user_data.badges;
          this.user_genres = data.user_data.genres;
          this.user_cover_photo = data.user_data.profile_avtar.usr_cover_photo ;
          this.user_post = data.user_post.data;
          this.user_meta = data.user_data.user_meta;
          this.user_frnd_status = data.friend;
        }
        this.api.dismissLoading();
      },(error)=>{
        
      });
  }

  clickbtnHide(){
    this.btnHide = true;
    this.tabView = false;
  }

  cancelWritePost(){
    this.btnHide = false;
    this.tabView = true;
  }
  postviewArea(){
    this.postTextArea = true;
    this.photoArea  = false;
    this.videoArea = false;

    this.PostTab = true;
    this.PhotoTab = false;
    this.VideoTab = false;
  }

  photoviewArea(){
    this.postTextArea = false;
    this.photoArea  = true;
    this.videoArea = false;

    this.PostTab = false;
    this.PhotoTab = true;
    this.VideoTab = false;
  }

  videoviewArea(){
    this.postTextArea = true;
    this.photoArea  = false;
    this.videoArea = true;

    this.PostTab = false;
    this.PhotoTab = false;
    this.VideoTab = true;
  }

  goToBack(){
    this.navCtrl.back();
  }

  async privacy()
  {
    const modal = await this.modalController.create({
      component: PrivacyComponent,
      componentProps: {
        networkType: this.networkType
      }
    });
    return await modal.present();
  }

  async post() {
    const modal = await this.modalCtrl.create({
      component: CreatepostPage,
    });
    modal.onDidDismiss().then(v => {
      this.api.presentLoading();
    });
    return await modal.present();
  }
}
