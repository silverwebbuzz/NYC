import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { OptionsconnectionsComponent } from '../component/optionsconnections/optionsconnections.component';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.page.html',
  styleUrls: ['./networks.page.scss'],
})
export class NetworksPage implements OnInit {

  user_url: any;
  user_id : any;
  all_members : any = [];

  constructor(private api: RestApiService,
    private auth: AuthenticationService,
    private router: Router,
    private popoverController: PopoverController) {

      this.auth.userDetails
      .subscribe(res => {
        if (res) {
          this.user_url = res.avatar;
          this.user_id = res.id;
          console.log(res);
        }

        this.getapiCall();
      });
      
     }

  ngOnInit() {
    //this.menu.enable(true);
    //this.statusBar.overlaysWebView(false);
  }

  getapiCall(){
    this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/allmembersdir/' + this.user_id)
      .subscribe(data => {
        this.api.dismissLoading();
        if(data){
          
          this.all_members = data.allmembers;
        }
      });
      
  }

  conversationPage(){
    this.router.navigate(['/conversation']);
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  userProfile(friendid){
    const url = '/userprofile/' + friendid + '/' + this.user_id;
    this.router.navigateByUrl(url);
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
