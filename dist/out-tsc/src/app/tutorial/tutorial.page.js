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
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
var TutorialPage = /** @class */ (function () {
    function TutorialPage(menu, statusBar, router) {
        this.menu = menu;
        this.statusBar = statusBar;
        this.router = router;
        this.showSkip = true;
        this.dir = 'ltr';
        this.slideOpts = {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            pager: false,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 5000,
            },
        };
        this.slidesPage = [
            {
                title: "Welcome to the Ionic Super Starter",
                description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
                image: 'assets/img/slider-img.jpg',
            },
            {
                title: "Welcome to the Ionic Super Starter",
                description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
                image: 'assets/img/slider-img.jpg',
            },
            {
                title: "Welcome to the Ionic Super Starter",
                description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
                image: 'assets/img/slider-img.jpg',
            }
        ];
    }
    TutorialPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        //this.statusBar.backgroundColorByHexString('#');
        this.statusBar.overlaysWebView(true);
    };
    TutorialPage.prototype.gotologinPage = function () {
        this.router.navigateByUrl('/login');
    };
    TutorialPage.prototype.gotoregistrationPage = function () {
        this.router.navigateByUrl('/signup');
    };
    TutorialPage = __decorate([
        Component({
            selector: 'app-tutorial',
            templateUrl: './tutorial.page.html',
            styleUrls: ['./tutorial.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            StatusBar,
            Router])
    ], TutorialPage);
    return TutorialPage;
}());
export { TutorialPage };
//# sourceMappingURL=tutorial.page.js.map