import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  tabs: string = "terms";
  html_content_policy : any;
  html_content_terms : any;

  constructor(private router: Router, 
    private api: RestApiService,
    public menu: MenuController,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private modalCtrl: ModalController,
    private navCtrl: NavController) {

     }

  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.terms();
    this.policy();
    }

    terms(){
      //this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/termsconditions/')
      .subscribe(data => {
        //this.api.dismissLoading();
        if(data){
          this.html_content_terms = data.post_content;
          //console.log('data:',this.html_content_terms);
        }
      });
    }

    policy(){
      //this.api.presentLoading();      
      this.api.get('wp-json/my-route/v1/privacypolicy/')
      .subscribe(data => {
        //this.api.dismissLoading();
        if(data){
          this.html_content_policy = data.post_content;
          //console.log('data:',this.html_content_policy);
        }
      });
    }

    close(){
      if(this.api.isModalOpen){
        this.api.dismissModal();
      }else{
        this.navCtrl.back();
      }
    }
    
  }
