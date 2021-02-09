import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestApiService } from '../services/rest-api.service';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TermsPage } from '../terms/terms.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  token_nonce: any;
  signup_form: FormGroup;
  isModalOpen: boolean = false;
  
  signup_fb() {
    this.signup_form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required
      ])],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      terms: [null, Validators.compose([Validators.required, Validators.pattern('true')])]
    },{
      validator: ConfirmPasswordValidator.MatchPassword
   });
  };

  constructor(private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    public api: RestApiService, public auth: AuthenticationService,
    public router: Router,
    private modalCtrl: ModalController) {
    this.signup_fb();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.statusBar.overlaysWebView(false);
  }
  webPage(){
    console.log('click');
    window.open('https://go-demo.co/nycwn-new/');
  }

  doSignup() {
    // Attempt to login in through our User service
    for (let v in this.signup_form.controls) {
      this.signup_form.controls[v].markAsTouched();
    }
    if (this.signup_form.valid) {
      if(!this.signup_form.value.terms){
        this.api.presentToastWithOptions("Please Accept Our Terms and Agreement and privacy policy.");
        return false;
      }
      console.log('checked',this.signup_form.value.terms);
      let nonceurl = 'api/get_nonce/?controller=user&method=register';
      this.api.presentLoading();
        let body = {
          "username" : this.signup_form.value.username,
          "email": this.signup_form.value.email,
          "password": this.signup_form.value.password
      };
      //let register_url = 'api/user/register/?username='+this.signup_form.value.username+'&nonce='+this.token_nonce+'&email='+this.signup_form.value.email+'&password='+this.signup_form.value.password+'';
      this.api.post('wp-json/wp/v2/users/register',body)
      .subscribe(data => {
        console.log('data : ', data);
        this.api.dismissLoading();
        if(data.code == 200){
          this.router.navigate(['/emailverify']);
        }else{
          this.api.dismissLoading();
          this.api.presentToastWithOptions("Something Wrong! Please Try Again or Contact to Administrator.");
        }
        
      }, (err) => {
        this.api.dismissLoading();
        this.api.presentToastWithOptions(err.message);
        console.log('error', err);
      });
      
      // this.api.post('user/register/', body)
      //   .subscribe(data => {
      //     this.auth.login(data.token);
      //     this.auth.storage.set('user_email', data.user_email);
      //     this.api.dismissLoading();
      //     this.router.navigateByUrl('/home');
      //     console.log('data : ', data);
      //   }, (err) => {
      //     this.api.dismissLoading();
      //     this.api.presentToastWithOptions(err);
      //     console.log('error', err);
      //   });
    }

  }
  goToLogin(){
    this.router.navigate(['/login']);
  }

  async terms_policy(){
    this.api.presentModal(TermsPage);
  }
}
