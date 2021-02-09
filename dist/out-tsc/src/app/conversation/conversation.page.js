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
import { Camera } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
var ConversationPage = /** @class */ (function () {
    function ConversationPage(router, camera, navCtrl) {
        this.router = router;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.postBtnHide = false;
    }
    ConversationPage.prototype.ngOnInit = function () {
    };
    ConversationPage.prototype.clickbtnHide = function () {
        this.postBtnHide = true;
    };
    ConversationPage.prototype.cancelWritePost = function () {
        this.postBtnHide = false;
        this.newmessage = "";
    };
    ConversationPage.prototype.openGallery = function () {
        var options = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: false
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    ConversationPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    ConversationPage = __decorate([
        Component({
            selector: 'app-conversation',
            templateUrl: './conversation.page.html',
            styleUrls: ['./conversation.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            Camera,
            NavController])
    ], ConversationPage);
    return ConversationPage;
}());
export { ConversationPage };
//# sourceMappingURL=conversation.page.js.map