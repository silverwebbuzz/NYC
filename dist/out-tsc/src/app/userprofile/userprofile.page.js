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
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { RestApiService } from '../services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CreatepostPage } from '../createpost/createpost.page';
import { PrivacyComponent } from '../component/privacy/privacy.component';
var UserprofilePage = /** @class */ (function () {
    function UserprofilePage(navCtrl, modalCtrl, api, menu, statusBar, auth, route, modalController) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.api = api;
        this.menu = menu;
        this.statusBar = statusBar;
        this.auth = auth;
        this.route = route;
        this.modalController = modalController;
        this.tabs = "timeline";
        this.btnHide = false;
        this.tabView = true;
        this.postTextArea = true;
        this.photoArea = false;
        this.videoArea = false;
        this.PostTab = true;
        this.VideoTab = false;
        this.PhotoTab = false;
        this.user_post = [];
        this.user_frnd_status = '';
        this.networkType = 'Public';
        console.log("hello");
    }
    UserprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.frdid = this.route.snapshot.paramMap.get('frdid');
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
        this.getapiCall();
        this.networkTypeStateStore();
    };
    UserprofilePage.prototype.networkTypeStateStore = function () {
        var _this = this;
        this.auth.NetworktypeState.subscribe(function (v) {
            console.log('v:', v);
            _this.networkType = v;
        });
    };
    UserprofilePage.prototype.sendFriendReq = function () {
        var _this = this;
        this.api.presentLoading();
        var body = {
            friend_id: this.frdid,
            user_id: this.user_id
        };
        this.api.post('wp-json/my-route/v1/sendrequests', body)
            .subscribe(function (data) {
            _this.getapiCall();
        });
    };
    UserprofilePage.prototype.getapiCall = function () {
        var _this = this;
        this.api.get('wp-json/my-route/v1/user_details/' + this.frdid + '/' + this.user_id)
            .subscribe(function (data) {
            if (data) {
                console.log("logData", data);
                _this.user_avatar = data.user_data.avatarimg;
                _this.user_name = data.user_data.username;
                _this.user_location = data.user_data.location;
                _this.user_badges = data.user_data.badges;
                _this.user_genres = data.user_data.genres;
                _this.user_cover_photo = data.user_data.profile_avtar.usr_cover_photo;
                _this.user_post = data.user_post.data;
                _this.user_meta = data.user_data.user_meta;
                _this.user_frnd_status = data.friend;
            }
            _this.api.dismissLoading();
        }, function (error) {
        });
    };
    UserprofilePage.prototype.clickbtnHide = function () {
        this.btnHide = true;
        this.tabView = false;
    };
    UserprofilePage.prototype.cancelWritePost = function () {
        this.btnHide = false;
        this.tabView = true;
    };
    UserprofilePage.prototype.postviewArea = function () {
        this.postTextArea = true;
        this.photoArea = false;
        this.videoArea = false;
        this.PostTab = true;
        this.PhotoTab = false;
        this.VideoTab = false;
    };
    UserprofilePage.prototype.photoviewArea = function () {
        this.postTextArea = false;
        this.photoArea = true;
        this.videoArea = false;
        this.PostTab = false;
        this.PhotoTab = true;
        this.VideoTab = false;
    };
    UserprofilePage.prototype.videoviewArea = function () {
        this.postTextArea = true;
        this.photoArea = false;
        this.videoArea = true;
        this.PostTab = false;
        this.PhotoTab = false;
        this.VideoTab = true;
    };
    UserprofilePage.prototype.goToBack = function () {
        this.navCtrl.back();
    };
    UserprofilePage.prototype.privacy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: PrivacyComponent,
                            componentProps: {
                                networkType: this.networkType
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
    UserprofilePage.prototype.post = function () {
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
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserprofilePage = __decorate([
        Component({
            selector: 'app-userprofile',
            templateUrl: './userprofile.page.html',
            styleUrls: ['./userprofile.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            ModalController,
            RestApiService,
            MenuController,
            StatusBar,
            AuthenticationService,
            ActivatedRoute,
            ModalController])
    ], UserprofilePage);
    return UserprofilePage;
}());
export { UserprofilePage };
//# sourceMappingURL=userprofile.page.js.map