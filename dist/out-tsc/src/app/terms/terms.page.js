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
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
var TermsPage = /** @class */ (function () {
    function TermsPage(router, api, menu, statusBar, auth, modalCtrl, navCtrl) {
        this.router = router;
        this.api = api;
        this.menu = menu;
        this.statusBar = statusBar;
        this.auth = auth;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.tabs = "terms";
    }
    TermsPage.prototype.ngOnInit = function () {
        this.statusBar.overlaysWebView(false);
        this.terms();
        this.policy();
    };
    TermsPage.prototype.terms = function () {
        var _this = this;
        //this.api.presentLoading();      
        this.api.get('wp-json/my-route/v1/termsconditions/')
            .subscribe(function (data) {
            //this.api.dismissLoading();
            if (data) {
                _this.html_content_terms = data.post_content;
                //console.log('data:',this.html_content_terms);
            }
        });
    };
    TermsPage.prototype.policy = function () {
        var _this = this;
        //this.api.presentLoading();      
        this.api.get('wp-json/my-route/v1/privacypolicy/')
            .subscribe(function (data) {
            //this.api.dismissLoading();
            if (data) {
                _this.html_content_policy = data.post_content;
                //console.log('data:',this.html_content_policy);
            }
        });
    };
    TermsPage.prototype.close = function () {
        if (this.api.isModalOpen) {
            this.api.dismissModal();
        }
        else {
            this.navCtrl.back();
        }
    };
    TermsPage = __decorate([
        Component({
            selector: 'app-terms',
            templateUrl: './terms.page.html',
            styleUrls: ['./terms.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            RestApiService,
            MenuController,
            StatusBar,
            AuthenticationService,
            ModalController,
            NavController])
    ], TermsPage);
    return TermsPage;
}());
export { TermsPage };
//# sourceMappingURL=terms.page.js.map