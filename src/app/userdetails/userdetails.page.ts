import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { RestApiService } from '../services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  tabs: string = "activity";
  result: Array<any>=[];
  user_id:any;
  


  user_url : any;

  user_avatar : any;
  user_name : any;
  user_location : any;
  user_badges : any;
  user_genres : any;
  user_cover_photo : any;
  user_post : any = [];
  user_meta : any;
  user_frnd_status : any = '';
  experience:any=[];
  user_email:any=[];
  constructor(private route: ActivatedRoute,    
    private menu: MenuController,
       private statusBar: StatusBar,private navCtrl: NavController,private api: RestApiService,
       private auth: AuthenticationService)
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
    this.moreinfo(); 
  }
  // sendFriendReq(){
  //   this.api.presentLoading();
  //   const body = {
  //     user_id : this.user_id
  //   }
  //   this.api.post('wp-json/my-route/v1/user_details/',body)
  //   .subscribe(data =>{
  //     this.moreinfo(); 
  //   })
  // }
  ngOnInit() {
    
  }

  goToBack(){
    this.navCtrl.back();
  }
  moreinfo() {
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
        this.experience=data.user_data.user_meta.experience;

        // this.user_email = JSON.stringify(data.user_post.data.author.user_email);
      
      }
      this.api.dismissLoading();
    },(error)=>{
      
    });
}

}
