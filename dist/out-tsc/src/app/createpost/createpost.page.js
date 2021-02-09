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
import { ModalController, ActionSheetController, Platform, IonContent } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/File/ngx';
import { PrivacyComponent } from '../component/privacy/privacy.component';
import { AuthenticationService } from '../services/authentication.service';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
var CreatepostPage = /** @class */ (function () {
    // post_id:any;
    function CreatepostPage(modalController, actionSheetController, plt, filePath, router, auth, file, camera, restProvider) {
        var _this = this;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.plt = plt;
        this.filePath = filePath;
        this.router = router;
        this.auth = auth;
        this.file = file;
        this.camera = camera;
        this.restProvider = restProvider;
        // myStorage:any;
        this.image = '';
        this.imageURI = '';
        this.setPhotoArea = '';
        this.networkType = 'Public';
        this.videoArea = false;
        this.photoArea = false;
        // this.post_id = this.navParams.get('postId');
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                console.log("res:", res);
                _this.user_id = res.id;
                _this.user_url = res.avatar;
                _this.username = res.username;
            }
        });
    }
    CreatepostPage.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.NetworktypeState.subscribe(function (v) {
            console.log('v:', v);
            _this.networkType = v;
        });
    };
    CreatepostPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    CreatepostPage.prototype.presentActionSheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: 'Photo',
                                    icon: 'albums',
                                    handler: function () {
                                        //console.log('Photo Clicked');
                                        _this.videoArea = false;
                                        var options = {
                                            quality: 70,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE,
                                            saveToPhotoAlbum: true
                                        };
                                        _this.camera.getPicture(options).then(function (imageData) {
                                            // imageData is either a base64 encoded string or a file URI
                                            // If it's base64 (DATA_URL):
                                            console.log(imageData);
                                            _this.photoArea = true;
                                            _this.setPhotoArea = 'data:image/jpeg;base64,' + imageData;
                                        }, function (err) {
                                            // Handle error
                                        });
                                    }
                                }, {
                                    text: 'Video',
                                    icon: 'videocam',
                                    handler: function () {
                                        //console.log('Clicked Video Url');
                                        _this.videoArea = true;
                                        _this.photoArea = false;
                                    }
                                }, {
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        //console.log('Clicked on Camera');
                                        _this.videoArea = false;
                                        var options = {
                                            quality: 100,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE,
                                            cameraDirection: 0
                                        };
                                        _this.camera.getPicture(options).then(function (imageData) {
                                            _this.photoArea = true;
                                            _this.setPhotoArea = 'data:image/jpeg;base64,' + imageData;
                                        }, function (err) {
                                            // Handle error
                                        });
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreatepostPage.prototype.submitWritePost = function () {
        var _this = this;
        if (!this.photoArea && !this.videoArea) {
            if (!this.Message) {
                this.restProvider.presentToastWithOptions('Write Something....', '', 'top');
                return;
            }
            var body = {
                post_author: this.user_id,
                act_owner_id: this.user_id,
                post_content: this.Message,
                post_type: "peepso-post"
            };
            this.restProvider.presentLoading();
            this.restProvider.post('wp-json/my-route/v1/postadd', body)
                .subscribe(function (v) {
                _this.modalController.dismiss();
                _this.restProvider.dismissLoading();
            }, function (err) {
                _this.restProvider.dismissLoading();
                _this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
            });
        }
        else if (this.videoArea) {
            if (!this.VideoURL) {
                this.restProvider.presentToastWithOptions('Please Insert a Video URL..', '', 'top');
                return;
            }
            var videotitle = void 0;
            if (!this.VideoTitle) {
                videotitle = '';
            }
            else {
                videotitle = this.VideoTitle;
            }
            var msgbox = void 0;
            if (!this.Message) {
                msgbox = '';
            }
            else {
                msgbox = this.Message;
            }
            var body = {
                vid_url: this.VideoURL,
                vid_title: videotitle,
                post_author: this.user_id,
                act_owner_id: this.user_id,
                post_content: msgbox,
                post_type: "peepso-post"
            };
            this.restProvider.presentLoading();
            this.restProvider.post('wp-json/my-route/v1/postaddvideo', body)
                .subscribe(function (v) {
                _this.modalController.dismiss();
                _this.restProvider.dismissLoading();
            }, function (err) {
                _this.restProvider.dismissLoading();
                _this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
            });
        }
        else if (this.photoArea) {
            var msgbox = void 0;
            if (!this.Message) {
                msgbox = '';
            }
            else {
                msgbox = this.Message;
            }
            this.restProvider.presentLoading();
            var body = {
                photo: this.setPhotoArea,
                id: this.user_id,
                post_type: "peepso-post",
                post_excerpt: msgbox
            };
            this.restProvider.post('wp-json/my-route/v1/uploadimg/' + this.user_id, body)
                .subscribe(function (v) {
                _this.modalController.dismiss();
                _this.restProvider.dismissLoading();
            }, function (err) {
                _this.restProvider.dismissLoading();
                _this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
            });
        }
        else {
            this.restProvider.presentToastWithOptions('Something Wrong! try Again.', '', 'top');
        }
    };
    CreatepostPage.prototype.privacy = function () {
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
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], CreatepostPage.prototype, "contentScroll", void 0);
    CreatepostPage = __decorate([
        Component({
            selector: 'app-createpost',
            templateUrl: './createpost.page.html',
            styleUrls: ['./createpost.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            ActionSheetController,
            Platform,
            FilePath,
            Router,
            AuthenticationService,
            File,
            Camera,
            RestApiService])
    ], CreatepostPage);
    return CreatepostPage;
}());
export { CreatepostPage };
//# sourceMappingURL=createpost.page.js.map