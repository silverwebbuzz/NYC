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
import { Component } from '@angular/core';
import { MenuController, Platform, ToastController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { RestApiService } from '../services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CreatepostPage } from '../createpost/createpost.page';
import { CommentsComponent } from '../component/comments/comments.component';
import { ReactionComponent } from '../component/reaction/reaction.component';
import { SearchComponent } from '../component/search/search.component';
import { OptionshomeComponent } from '../component/optionshome/optionshome.component';
var HomePage = /** @class */ (function () {
    function HomePage(menu, auth, api, statusBar, platform, toast, router, alertCtrl, appCom, socialSharing, modalCtrl, popoverCtrl
    //private nav: NavController
    ) {
        var _this = this;
        this.menu = menu;
        this.auth = auth;
        this.api = api;
        this.statusBar = statusBar;
        this.platform = platform;
        this.toast = toast;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.appCom = appCom;
        this.socialSharing = socialSharing;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.message = 'Check out the NYCWN!';
        this.url = 'NYCWN';
        this.likebtn = true;
        this.likeBtn = true;
        this.counter = 0;
        this.platform.ready().then(function () {
            //console.log('url:', this.router.url);
            _this.backButtonEvent();
        });
        this.getUserDetils();
        this.api.presentLoading();
        this.getReactionType();
    }
    HomePage.prototype.getUserDetils = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.userDetails
                            .subscribe(function (res) {
                            if (res) {
                                _this.user_url = res.avatar;
                                _this.user_id = res.id;
                            }
                            _this.getAllActivites();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getAllActivites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('wp-json/my-route/all_activities/' + this.user_id)
                            .subscribe(function (data) {
                            if (data) {
                                _this.posts = data;
                            }
                            console.log('Data:', _this.posts);
                            _this.api.dismissLoading();
                        }, function (err) {
                            console.log('erro:', err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.backButtonEvent = function () {
        var _this = this;
        this.platform.backButton.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'App termination',
                            message: 'Do you want to close the app?',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Application exit prevented!');
                                    }
                                }, {
                                    text: 'Close App',
                                    handler: function () {
                                        navigator['app'].exitApp();
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    HomePage.prototype.getReactionType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('wp-json/my-route/v1/reactions').subscribe(function (data) {
                            _this.allReactionType = data;
                            console.log(_this.allReactionType);
                            //console.log("--Your data--"+JSON.stringify(this.reactions));
                        }, function (err) {
                            console.log(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.exitAppToastMsg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toastmsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toast.create({
                            message: "Press back again to exit App.",
                            duration: 2000,
                            position: 'top',
                            cssClass: 'dark-trans exit-app-toster',
                            closeButtonText: 'OK',
                            showCloseButton: false
                        })];
                    case 1:
                        toastmsg = _a.sent();
                        toastmsg.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.convertNumber = function (Data) {
        return parseInt(Data);
    };
    HomePage.prototype.ngOnInit = function () {
        this.menu.enable(true);
        this.statusBar.overlaysWebView(false);
    };
    HomePage.prototype.gotoProfile = function () {
        this.router.navigate(['/profile']);
    };
    HomePage.prototype.gotoUserProfile = function (friendid) {
        var url = '/userprofile/' + friendid + '/' + this.user_id;
        this.router.navigateByUrl(url);
    };
    HomePage.prototype.doRefresh = function (event) {
        var _this = this;
        this.api.get('wp-json/my-route/all_activities/' + this.user_id)
            .subscribe(function (data) {
            _this.posts = data;
            event.target.complete();
        });
    };
    HomePage.prototype.sharePicker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.platform.ready()
                    .then(function () {
                    _this.socialSharing.share(_this.message, null, null, _this.url)
                        .then(function (data) {
                        console.log('Shared via SharePicker');
                    })
                        .catch(function (err) {
                        console.log('Was not shared via SharePicker');
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.showReactions = function (ev, postIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var reactions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //console.log(ev);
                        //console.log("you have clicked the button");
                        this.post_index = postIndex;
                        return [4 /*yield*/, this.popoverCtrl.create({
                                component: ReactionComponent,
                                event: ev,
                                cssClass: 'contact-popover',
                                backdropDismiss: true,
                                showBackdrop: true,
                                translucent: true,
                                componentProps: { allrecation: this.allReactionType }
                            })];
                    case 1:
                        reactions = _a.sent();
                        reactions.onDidDismiss().then(function (dataReturned) {
                            var typeLike = dataReturned.data;
                            if (typeLike > -1) {
                                _this.posts[_this.post_index].post_reaction = typeLike;
                                var act_id = _this.posts[_this.post_index].act_id;
                                var body = {
                                    "reaction_type": typeLike,
                                    "reaction_user_id": _this.user_id,
                                    "reaction_act_id": act_id
                                };
                                _this.api.post('wp-json/my-route/v1/addreaction', body).subscribe(function (val) {
                                    console.log('Success:', val);
                                }, function (err) {
                                    console.log('Error:', err);
                                });
                            }
                        });
                        return [4 /*yield*/, reactions.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.post = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: CreatepostPage,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (v) {
                            _this.api.presentLoading();
                            _this.getAllActivites();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.postOptions = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: OptionshomeComponent,
                            event: ev,
                            translucent: true,
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.openCommentModal = function (post_id, post_author_id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: CommentsComponent,
                            componentProps: {
                                postId: post_id,
                                postAuthor: post_author_id
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
    HomePage.prototype.searchModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: SearchComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        __metadata("design:paramtypes", [MenuController,
            AuthenticationService,
            RestApiService,
            StatusBar,
            Platform,
            ToastController,
            Router,
            AlertController,
            AppComponent,
            SocialSharing,
            ModalController,
            PopoverController
            //private nav: NavController
        ])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map