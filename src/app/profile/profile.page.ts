import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { RestApiService } from '../services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { PrivacyComponent } from '../component/privacy/privacy.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{

  btnHide: boolean = false;
  tabView: boolean = true;
  postTextArea : boolean = true;
  photoArea : boolean = false;
  videoArea : boolean = false;

  PostTab : boolean = true;
  VideoTab : boolean = false;
  PhotoTab : boolean = false;

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
  experience_status:any=[];
  user_email : any = [];
  user_phone : any = [];
  description_status:any=[];
  certification_status:any=[];

  networkType: string = 'Public';

  constructor(private route: ActivatedRoute,    
    private menu: MenuController,
       private statusBar: StatusBar,
       private navCtrl: NavController,   
       private api: RestApiService,
       private auth: AuthenticationService,
       private modalController: ModalController) 
  {    
    this.user_id = this.route.snapshot.paramMap.get('userid');
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
  }

  ngOnInit(){
    this.networkTypeStateStore();
  }

  networkTypeStateStore(){
    this.auth.NetworktypeState.subscribe(v => {
      //console.log('v:',v);
      this.networkType = v;
    });
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

  sendFriendReq(){
    this.api.presentLoading();
    const body = {
      user_id : this.user_id
    }
    this.api.post('wp-json/my-route/v1/user_details/',body)
    .subscribe(data =>{
      this.getapiCall(); 
    })
  }
  getapiCall(){

    this.api.get('wp-json/my-route/v1/user_details/' + this.user_id + '/' + this.user_id)
    .subscribe(data => {
      if(data){
        console.log(data);  
        this.user_avatar = data.user_data.avatarimg;
        this.user_name = data.user_data.username;
        this.user_location = data.user_data.location;
        this.user_badges = data.user_data.badges;
        this.user_genres = data.user_data.genres;
        this.user_cover_photo = data.user_data.profile_avtar.usr_cover_photo ;
        this.user_post = data.user_post.data;
        this.user_meta = data.user_data.user_meta;
        this.user_frnd_status = data.friend;
        this.user_phone = data.user_data.phone;

        this.description_status=data.user_data.user_meta.description;

        this.experience_status=data.user_data.user_meta.experience;
        this.certification_status=data.user_data.user_meta.certification;

        //console.log(data.user_data.email);

        // this.user_email = JSON.stringify(data.user_post.data.author.user_email);

      this.user_email = data.user_data.email;
      //var user_email = JSON.stringify(user_email);
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


}
