import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  login_form: FormGroup;
  login_fb() {
    this.login_form = this.formBuilder.group({
      username: [null, Validators.required],
      // email: [null, Validators.compose([
      //   Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
      //   Validators.required
      // ])],
      password: [null, Validators.required]
    });
  };
  constructor(public menu: MenuController, private statusBar: StatusBar,
    private formBuilder: FormBuilder, public api: RestApiService, public auth: AuthenticationService,
    public router: Router) {
    this.login_fb();
  }

  ngOnInit() {
    this.menu.enable(false);
    this.statusBar.overlaysWebView(false);
  }

  doLogin() {
    for (let v in this.login_form.controls) {
      this.login_form.controls[v].markAsTouched();
    }
    if (this.login_form.valid) {
      this.api.presentLoading();
      let body = {
        "username": this.login_form.value.username,
        "password": this.login_form.value.password
      };

      this.api.post('wp-json/jwt-auth/v1/token', body)
        .subscribe(data => {
          if (data) {
            const bodyText = {
              token: data.token,
              username: data.user_nicename,
              displayname: data.user_display_name,
              email: data.user_email,
              password: this.login_form.value.password
            };
            this.auth.setUser(bodyText);
            this.auth.generateAuthCookie(bodyText);
            this.auth.login(data.token); 
            this.api.dismissLoading();           
          }
          //this.router.navigateByUrl('/tabs');
        }, (err) => {
          this.api.dismissLoading();
          if (err.code === "[jwt_auth] pending_approval") {
            this.router.navigate(['/emailverify']);
          } else {
            this.api.presentToastWithOptions(err.message);
          }

        });
    }
  }

  forgotPass() {
    this.router.navigate(['/forgotpassword']);
  }

  goTORegister(){
    this.router.navigate(['/signup']);
  }



}
