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
import { ModalController, PopoverController, MenuController, NavParams, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { RepliesComponent } from '../replies/replies.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ReactionComponent } from '../reaction/reaction.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(modalCtrl, router, camera, popoverCtrl, restProvider, auth, navParams, menu, statusBar) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.router = router;
        this.camera = camera;
        this.popoverCtrl = popoverCtrl;
        this.restProvider = restProvider;
        this.auth = auth;
        this.navParams = navParams;
        this.menu = menu;
        this.statusBar = statusBar;
        this.postBtnHide = false;
        this.like = false;
        this.posts = [];
        this.iscomment = true;
        // this.user_id = this.route.snapshot.paramMap.get('userid');
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
        this.post_id = this.navParams.get('postId');
        console.log('post_id', this.post_id);
        this.postAuthor = this.navParams.get('postAuthor');
        console.log('postAuthor', this.postAuthor);
        this.iscomment = false;
        this.restProvider.presentLoading();
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_url = res.avatar;
                _this.user_id = res.id;
            }
            console.log(_this.user_id);
        });
        this.comment();
    }
    CommentsComponent.prototype.ngOnInit = function () {
    };
    CommentsComponent.prototype.goToProfile = function () {
        this.router.navigate(['/profile']);
    };
    CommentsComponent.prototype.comment = function () {
        var _this = this;
        this.restProvider.get('wp-json/my-route/postcomment/' + this.user_id + '/postid:' + this.post_id).subscribe(function (data) {
            _this.contentScroll.scrollToTop();
            if (data) {
                _this.posts = data;
            }
            console.log(_this.posts);
            _this.restProvider.dismissLoading();
        }, function (err) {
            console.log('Error:', err);
            _this.restProvider.presentToastWithOptions('Something Wrong! Please try again.');
            _this.restProvider.dismissLoading();
        });
    };
    CommentsComponent.prototype.likeComment = function (index, commentId) {
        if (index > -1) {
            this.posts[index].like = true;
        }
        var body = {
            like_user_id: this.user_id,
            like_external_id: commentId,
            like_module_id: "1"
        };
        this.restProvider.post('wp-json/my-route/v1/makepostcommentlike', body)
            .subscribe(function (v) {
            console.log('V:', v);
        }, function (err) {
            console.log('Comment Like Eroor:', err);
        });
    };
    CommentsComponent.prototype.dislikeComment = function (index, commentId) {
        if (index > -1) {
            this.posts[index].like = false;
        }
    };
    CommentsComponent.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalCtrl.dismiss();
                return [2 /*return*/];
            });
        });
    };
    CommentsComponent.prototype.openModal = function (comment_id, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: RepliesComponent,
                            componentProps: {
                                commentId: comment_id,
                                preComment: comment
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentsComponent.prototype.clickbtnHide = function () {
        this.postBtnHide = true;
    };
    CommentsComponent.prototype.cancelWritePost = function () {
        this.postBtnHide = false;
        this.newmessage = "";
    };
    CommentsComponent.prototype.openGallery = function () {
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
    CommentsComponent.prototype.submitWritePost = function () {
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
            act_owner_id: this.postAuthor,
            act_comment_object_id: this.post_id
        };
        this.restProvider.post('wp-json/my-route/v1/postcomment', body)
            .subscribe(function (v) {
            _this.comment();
        }, function (err) {
            console.log('Error:', err);
            _this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
            _this.comment();
        });
    };
    CommentsComponent.prototype.showReactions = function (ev) {
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
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], CommentsComponent.prototype, "contentScroll", void 0);
    CommentsComponent = __decorate([
        Component({
            selector: 'app-comments',
            templateUrl: './comments.component.html',
            styleUrls: ['./comments.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController,
            Router,
            Camera,
            PopoverController,
            RestApiService,
            AuthenticationService,
            NavParams,
            MenuController,
            StatusBar])
    ], CommentsComponent);
    return CommentsComponent;
}());
export { CommentsComponent };
//# sourceMappingURL=comments.component.js.map