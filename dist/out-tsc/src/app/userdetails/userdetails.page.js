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
import { RestApiService } from '../services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
var UserdetailsPage = /** @class */ (function () {
    function UserdetailsPage(route, menu, statusBar, navCtrl, api, auth) {
        var _this = this;
        this.route = route;
        this.menu = menu;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.api = api;
        this.auth = auth;
        this.tabs = "activity";
        this.result = [];
        this.user_post = [];
        this.user_frnd_status = '';
        this.experience = [];
        this.user_email = [];
        this.user_id = this.route.snapshot.paramMap.get('userid');
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
        this.api.presentLoading();
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_url = res.avatar;
                _this.user_id = res.id;
            }
        });
        this.moreinfo();
    }
    // sendFriendReq(){
    //   this.api.presentLoading();
    //   const body = {
    //     user_id : this.user_id
    //   }
    //   this.api.post('wp-json/my-route/v1/user_details/',body)
    //   .subscribe(data =>{
    //     this.moreinfo(); 
    //   })
    // }
    UserdetailsPage.prototype.ngOnInit = function () {
    };
    UserdetailsPage.prototype.goToBack = function () {
        this.navCtrl.back();
    };
    UserdetailsPage.prototype.moreinfo = function () {
        var _this = this;
        this.api.get('wp-json/my-route/v1/user_details/' + this.user_id + '/' + this.user_id)
            .subscribe(function (data) {
            if (data) {
                console.log(data);
                _this.user_avatar = data.user_data.avatarimg;
                _this.user_name = data.user_data.username;
                _this.user_location = data.user_data.location;
                _this.user_badges = data.user_data.badges;
                _this.user_genres = data.user_data.genres;
                _this.user_cover_photo = data.user_data.profile_avtar.usr_cover_photo;
                _this.user_post = data.user_post.data;
                _this.user_meta = data.user_data.user_meta;
                _this.user_frnd_status = data.friend;
                _this.experience = data.user_data.user_meta.experience;
                // this.user_email = JSON.stringify(data.user_post.data.author.user_email);
            }
            _this.api.dismissLoading();
        }, function (error) {
        });
    };
    UserdetailsPage = __decorate([
        Component({
            selector: 'app-userdetails',
            templateUrl: './userdetails.page.html',
            styleUrls: ['./userdetails.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MenuController,
            StatusBar, NavController, RestApiService,
            AuthenticationService])
    ], UserdetailsPage);
    return UserdetailsPage;
}());
export { UserdetailsPage };
//# sourceMappingURL=userdetails.page.js.map