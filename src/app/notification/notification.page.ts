import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationsComponent } from '../component/optionsnotifications/notifications.component';
import { RestApiService } from '../services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  tabs: string = "activity";
  result: Array<any>=[];
  user_id:any;
  user_avtar : any;
  username : any;
  content:any=[];
  time:any=[];

  posts:any=[];
  
  constructor(private popoverCtrl: PopoverController,
    private auth: AuthenticationService,private api: RestApiService,private route: ActivatedRoute,    
    private menu: MenuController,
       private statusBar: StatusBar,
       private router: Router,
       private alertCtrl: AlertController) {

        this.user_id = this.route.snapshot.paramMap.get('userid');
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
        this.api.presentLoading();
        this.auth.userDetails
          .subscribe(res => {
            if (res) {
              this.user_id = res.id;
              this.user_avtar = res.avatar;
            }
          });
        this.moreinfo();
        }

  ngOnInit() {
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  
  moreinfo() {
    this.api.get('wp-json/my-route/v1/latestnotification/' + this.user_id) 
    .subscribe(data => {
      if(data){
        this.posts = data;
        console.log(this.posts);
        this.api.dismissLoading();
      }
      
    });
  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: NotificationsComponent,
        event: ev,
        translucent: true,
    });
    return await popover.present();
  }

}
