import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { MenuController, PopoverController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { OptionsconnectionsComponent } from '../component/optionsconnections/optionsconnections.component';
@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  tabs: string = "frdreq_frd";
  user_url: any;
  user_id : any;
  new_member_list : any = [];
  all_friends : any = [];
  incoming_request : any = [];
  requested_member : any = [];
  constructor(private router: Router, 
              private api: RestApiService,
              public menu: MenuController,
              private statusBar: StatusBar,
              private auth: AuthenticationService,
              private popoverController: PopoverController
              ) { 
  }

  ngOnInit() {
    this.menu.enable(true);
    this.statusBar.overlaysWebView(false);
    this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_url = res.avatar;
          this.user_id = res.id;
          console.log(res);
        }
      });
    this.getapiCall();
    //this.requestedFriendList();
  }

  getapiCall(){
    this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/allmembers/' + this.user_id)
      .subscribe(data => {
        this.api.dismissLoading();
        if(data){
          console.log(data);
          this.new_member_list = data.newmembers;
          this.all_friends = data.all_friends;
          this.requested_member = data.requested_frd;
          this.incoming_request = data.frdreq_frd;          
        }
        
      });
      
  }

  // requestedFriendList(){    
  //     this.api.get('wp-json/my-route/v1/get_request/' + this.user_id)
  //     .subscribe(data => {
  //       this.api.dismissLoading();
  //       if(data){
  //         console.log('friendList',data);
  //         this.requested_member = data;          
  //       }
        
  //     });
      
  // }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  userProfile(friendid){
    const url = '/userprofile/' + friendid + '/' + this.user_id;
    this.router.navigateByUrl(url);
  }

  sendFriendRquest(friendid){
    this.api.presentLoading();
    const body = {
      friend_id : friendid,
      user_id : this.user_id
    }
    this.api.post('wp-json/my-route/v1/sendrequests',body)
    .subscribe(data =>{
      this.api.dismissLoading();
      this.getapiCall(); 
    })
  }

  changeuserList(){
    this.getapiCall();
    //this.requestedFriendList();
  }

  async membersPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: OptionsconnectionsComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
