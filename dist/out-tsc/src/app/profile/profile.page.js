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
import { ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { PrivacyComponent } from '../component/privacy/privacy.component';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(route, menu, statusBar, navCtrl, api, auth, modalController) {
        var _this = this;
        this.route = route;
        this.menu = menu;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.api = api;
        this.auth = auth;
        this.modalController = modalController;
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
        this.experience_status = [];
        this.user_email = [];
        this.user_phone = [];
        this.description_status = [];
        this.certification_status = [];
        this.networkType = 'Public';
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
        this.getapiCall();
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.networkTypeStateStore();
    };
    ProfilePage.prototype.networkTypeStateStore = function () {
        var _this = this;
        this.auth.NetworktypeState.subscribe(function (v) {
            //console.log('v:',v);
            _this.networkType = v;
        });
    };
    ProfilePage.prototype.privacy = function () {
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
    ProfilePage.prototype.sendFriendReq = function () {
        var _this = this;
        this.api.presentLoading();
        var body = {
            user_id: this.user_id
        };
        this.api.post('wp-json/my-route/v1/user_details/', body)
            .subscribe(function (data) {
            _this.getapiCall();
        });
    };
    ProfilePage.prototype.getapiCall = function () {
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
                _this.user_phone = data.user_data.phone;
                _this.description_status = data.user_data.user_meta.description;
                _this.experience_status = data.user_data.user_meta.experience;
                _this.certification_status = data.user_data.user_meta.certification;
                //console.log(data.user_data.email);
                // this.user_email = JSON.stringify(data.user_post.data.author.user_email);
                _this.user_email = data.user_data.email;
                //var user_email = JSON.stringify(user_email);
            }
            _this.api.dismissLoading();
        }, function (error) {
        });
    };
    ProfilePage.prototype.clickbtnHide = function () {
        this.btnHide = true;
        this.tabView = false;
    };
    ProfilePage.prototype.cancelWritePost = function () {
        this.btnHide = false;
        this.tabView = true;
    };
    ProfilePage.prototype.postviewArea = function () {
        this.postTextArea = true;
        this.photoArea = false;
        this.videoArea = false;
        this.PostTab = true;
        this.PhotoTab = false;
        this.VideoTab = false;
    };
    ProfilePage.prototype.photoviewArea = function () {
        this.postTextArea = false;
        this.photoArea = true;
        this.videoArea = false;
        this.PostTab = false;
        this.PhotoTab = true;
        this.VideoTab = false;
    };
    ProfilePage.prototype.videoviewArea = function () {
        this.postTextArea = true;
        this.photoArea = false;
        this.videoArea = true;
        this.PostTab = false;
        this.PhotoTab = false;
        this.VideoTab = true;
    };
    ProfilePage.prototype.goToBack = function () {
        this.navCtrl.back();
    };
    ProfilePage = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MenuController,
            StatusBar,
            NavController,
            RestApiService,
            AuthenticationService,
            ModalController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map