var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(menu, statusBar, formBuilder, api, auth, router) {
        this.menu = menu;
        this.statusBar = statusBar;
        this.formBuilder = formBuilder;
        this.api = api;
        this.auth = auth;
        this.router = router;
        this.login_fb();
    }
    LoginPage.prototype.login_fb = function () {
        this.login_form = this.formBuilder.group({
            username: [null, Validators.required],
            // email: [null, Validators.compose([
            //   Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
            //   Validators.required
            // ])],
            password: [null, Validators.required]
        });
    };
    ;
    LoginPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        this.statusBar.overlaysWebView(false);
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        for (var v in this.login_form.controls) {
            this.login_form.controls[v].markAsTouched();
        }
        if (this.login_form.valid) {
            this.api.presentLoading();
            var body = {
                "username": this.login_form.value.username,
                "password": this.login_form.value.password
            };
            this.api.post('wp-json/jwt-auth/v1/token', body)
                .subscribe(function (data) {
                if (data) {
                    var bodyText = {
                        token: data.token,
                        username: data.user_nicename,
                        displayname: data.user_display_name,
                        email: data.user_email,
                        password: _this.login_form.value.password
                    };
                    _this.auth.setUser(bodyText);
                    _this.auth.generateAuthCookie(bodyText);
                    _this.auth.login(data.token);
                    _this.api.dismissLoading();
                }
                //this.router.navigateByUrl('/tabs');
            }, function (err) {
                _this.api.dismissLoading();
                if (err.code === "[jwt_auth] pending_approval") {
                    _this.router.navigate(['/emailverify']);
                }
                else {
                    _this.api.presentToastWithOptions(err.message);
                }
            });
        }
    };
    LoginPage.prototype.forgotPass = function () {
        this.router.navigate(['/forgotpassword']);
    };
    LoginPage.prototype.goTORegister = function () {
        this.router.navigate(['/signup']);
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController, StatusBar,
            FormBuilder, RestApiService, AuthenticationService,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map