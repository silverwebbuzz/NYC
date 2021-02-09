import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-blocklist',
  templateUrl: './blocklist.page.html',
  styleUrls: ['./blocklist.page.scss'],
})
export class BlocklistPage implements OnInit {

  posts : any = [];
  user_id : any;
  user_url : any;
  username : any;

  constructor(private navCtrl: NavController,
    private router: Router, 
    private api: RestApiService,
    public menu: MenuController,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_id = res.id;
          this.user_url = res.avatar;
        }
      });
      this.getapiCall();
  }

  goToBack(){
    this.navCtrl.back();
  }

  getapiCall(){
    this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/blockapi/' + this.user_id)
      .subscribe(data => {
        this.api.dismissLoading();
        if(data){
          this.posts = data;
          console.log(data);
        }
      });
    }

}
