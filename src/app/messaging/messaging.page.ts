import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {

  posts : any = [];
  user_id : any;
  user_url : any;
  username : any;
  content : any=[];
  time : any=[];


  constructor(private router: Router, 
    private api: RestApiService,
    public menu: MenuController,
    private statusBar: StatusBar,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.menu.enable(true);
    this.statusBar.overlaysWebView(false);
    this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_id = res.id;
          this.user_url = res.avatar;
        }
      });
      this.getapiCall();
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  getapiCall(){
    this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/getmessage/' + this.user_id)
      .subscribe(data => {
        this.api.dismissLoading();
        if(data){
          this.posts = data;
          console.log(data);
        }
      });
    }
}
