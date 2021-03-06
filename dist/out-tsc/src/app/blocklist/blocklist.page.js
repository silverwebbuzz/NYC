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
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';
var BlocklistPage = /** @class */ (function () {
    function BlocklistPage(navCtrl, router, api, menu, auth) {
        this.navCtrl = navCtrl;
        this.router = router;
        this.api = api;
        this.menu = menu;
        this.auth = auth;
        this.posts = [];
    }
    BlocklistPage.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_id = res.id;
                _this.user_url = res.avatar;
            }
        });
        this.getapiCall();
    };
    BlocklistPage.prototype.goToBack = function () {
        this.navCtrl.back();
    };
    BlocklistPage.prototype.getapiCall = function () {
        var _this = this;
        this.api.presentLoading();
        this.api.get('wp-json/my-route/v1/blockapi/' + this.user_id)
            .subscribe(function (data) {
            _this.api.dismissLoading();
            if (data) {
                _this.posts = data;
                console.log(data);
            }
        });
    };
    BlocklistPage = __decorate([
        Component({
            selector: 'app-blocklist',
            templateUrl: './blocklist.page.html',
            styleUrls: ['./blocklist.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            Router,
            RestApiService,
            MenuController,
            AuthenticationService])
    ], BlocklistPage);
    return BlocklistPage;
}());
export { BlocklistPage };
//# sourceMappingURL=blocklist.page.js.map