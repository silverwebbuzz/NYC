var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild } from '@angular/core';
import { ModalController, PopoverController, NavController, MenuController, NavParams, IonInput } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { ReactionComponent } from '../reaction/reaction.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
var RepliesComponent = /** @class */ (function () {
    function RepliesComponent(modalCtrl, router, camera, popoverCtrl, navCtrl, restProvider, auth, route, navParams, menu, statusBar) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.camera = camera;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.restProvider = restProvider;
        this.auth = auth;
        this.route = route;
        this.navParams = navParams;
        this.menu = menu;
        this.statusBar = statusBar;
        this.postBtnHide = false;
        this.commentId = this.navParams.get('commentId');
        this.preComment = this.navParams.get('preComment');
        console.log('PreComent:', this.preComment);
        this.user_id = this.route.snapshot.paramMap.get('userid');
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
        this.restProvider.presentLoading();
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_url = res.avatar;
                _this.user_id = res.id;
            }
            console.log(_this.user_id);
        });
        this.reply();
    }
    RepliesComponent.prototype.ngOnInit = function () {
    };
    RepliesComponent.prototype.goToProfile = function () {
        this.router.navigate(['/profile']);
    };
    RepliesComponent.prototype.reply = function () {
        var _this = this;
        this.restProvider.get('wp-json/my-route/postcomment/postid:' + this.commentId).subscribe(function (data) {
            if (data) {
                _this.posts = data;
                console.log(_this.posts);
            }
            _this.restProvider.dismissLoading();
        }, function (err) {
            console.log('Error:', err);
            _this.restProvider.presentToastWithOptions('Something Wrong! Please try Again.');
            _this.restProvider.dismissLoading();
        });
    };
    RepliesComponent.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalCtrl.dismiss();
                return [2 /*return*/];
            });
        });
    };
    RepliesComponent.prototype.clickbtnHide = function () {
        this.replayCommentbox.setFocus();
        this.postBtnHide = true;
    };
    RepliesComponent.prototype.cancelWritePost = function () {
        this.postBtnHide = false;
        this.newmessage = "";
    };
    RepliesComponent.prototype.submitWritePost = function () {
        var _this = this;
        if (!this.newmessage) {
            this.restProvider.presentToastWithOptions("Write Some text...", '', 'top');
            return;
        }
        this.restProvider.presentLoading();
        var body = {
            post_author: this.user_id,
            post_content: this.newmessage,
            post_type: "peepso-comment",
            act_owner_id: this.preComment.author.ID,
            act_comment_object_id: this.commentId
        };
        this.restProvider.post('wp-json/my-route/v1/postcomment', body)
            .subscribe(function (v) {
            _this.reply();
        }, function (err) {
            console.log('Error:', err);
            _this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
            _this.reply();
        });
    };
    RepliesComponent.prototype.openGallery = function () {
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
    RepliesComponent.prototype.showReactions = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var reactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("you have cliked like button");
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: ReactionComponent,
                                event: ev,
                                cssClass: 'contact-popover'
                            })];
                    case 1:
                        reactions = _a.sent();
                        return [4 /*yield*/, reactions.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        ViewChild('replayCommentbox'),
        __metadata("design:type", IonInput)
    ], RepliesComponent.prototype, "replayCommentbox", void 0);
    RepliesComponent = __decorate([
        Component({
            selector: 'app-replies',
            templateUrl: './replies.component.html',
            styleUrls: ['./replies.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            Router,
            Camera,
            PopoverController,
            NavController,
            RestApiService,
            AuthenticationService,
            ActivatedRoute,
            NavParams,
            MenuController,
            StatusBar])
    ], RepliesComponent);
    return RepliesComponent;
}());
export { RepliesComponent };
//# sourceMappingURL=replies.component.js.map