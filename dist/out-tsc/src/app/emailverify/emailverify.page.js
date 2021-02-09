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
var EmailverifyPage = /** @class */ (function () {
    function EmailverifyPage(menuCtrl, statusCtrl, router) {
        this.menuCtrl = menuCtrl;
        this.statusCtrl = statusCtrl;
        this.router = router;
    }
    EmailverifyPage.prototype.ngOnInit = function () {
        this.menuCtrl.enable(false);
        this.statusCtrl.overlaysWebView(true);
    };
    EmailverifyPage.prototype.resendEmail = function () {
        console.log('On Progress');
    };
    EmailverifyPage.prototype.backtoLogin = function () {
        this.router.navigate(['/login']);
    };
    EmailverifyPage = __decorate([
        Component({
            selector: 'app-emailverify',
            templateUrl: './emailverify.page.html',
            styleUrls: ['./emailverify.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            StatusBar,
            Router])
    ], EmailverifyPage);
    return EmailverifyPage;
}());
export { EmailverifyPage };
//# sourceMappingURL=emailverify.page.js.map