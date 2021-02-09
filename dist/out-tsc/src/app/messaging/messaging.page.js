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
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
var MessagingPage = /** @class */ (function () {
    function MessagingPage(router, api, menu, statusBar, auth) {
        this.router = router;
        this.api = api;
        this.menu = menu;
        this.statusBar = statusBar;
        this.auth = auth;
        this.posts = [];
        this.content = [];
        this.time = [];
    }
    MessagingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_id = res.id;
                _this.user_url = res.avatar;
            }
        });
        this.getapiCall();
    };
    MessagingPage.prototype.gotoProfile = function () {
        this.router.navigate(['/profile']);
    };
    MessagingPage.prototype.getapiCall = function () {
        var _this = this;
        this.api.presentLoading();
        this.api.get('wp-json/my-route/v1/getmessage/' + this.user_id)
            .subscribe(function (data) {
            _this.api.dismissLoading();
            if (data) {
                _this.posts = data;
                console.log(data);
            }
        });
    };
    MessagingPage = __decorate([
        Component({
            selector: 'app-messaging',
            templateUrl: './messaging.page.html',
            styleUrls: ['./messaging.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            RestApiService,
            MenuController,
            StatusBar,
            AuthenticationService])
    ], MessagingPage);
    return MessagingPage;
}());
export { MessagingPage };
//# sourceMappingURL=messaging.page.js.map