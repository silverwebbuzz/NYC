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
import { Component, ViewChildren, QueryList } from '@angular/core';
import { Platform, AlertController, MenuController, ToastController, ActionSheetController, PopoverController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { RestApiService } from './services/rest-api.service';
import { Network } from '@ionic-native/network/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, auth, router, menu, alertController, api, network, actionSheetCtrl, popoverCtrl, modalCtrl, toast) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.auth = auth;
        this.router = router;
        this.menu = menu;
        this.alertController = alertController;
        this.api = api;
        this.network = network;
        this.actionSheetCtrl = actionSheetCtrl;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        this.toast = toast;
        this.appPages = [
            {
                title: 'Home',
                url: '/tabs/home',
                icon: 'home'
            },
            {
                title: 'Profile',
                url: '/profile',
                icon: 'contact'
            },
            {
                title: 'Calender',
                url: '/events',
                icon: 'calendar'
            },
            {
                title: 'Groups',
                url: '/',
                icon: 'people'
            },
            {
                title: 'Contact NYCWN',
                url: '/contact',
                icon: 'contacts'
            },
            {
                title: 'Terms & Policies',
                url: '/terms',
                icon: 'paper'
            },
            {
                title: 'Account Settings',
                url: '/setting',
                icon: 'settings'
            },
            {
                title: 'Invite',
                url: '/invite',
                icon: 'person-add'
            },
        ];
        this.counter = 0;
        this.subscriptions = [];
        this.lastTimeBackPress = 0;
        this.timePeriodToExit = 2000;
        this.initializeApp();
        this.backButtonEvent();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            _this.presentAlertOffline();
        });
        this.network.onConnect().subscribe(function () {
            _this.presentAlertOnline();
        });
    };
    AppComponent.prototype.presentAlertOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Great!',
                            message: ' Back to online',
                            backdropDismiss: false,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.presentAlertOffline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Connection lost!',
                            message: '  You are not connected to internet',
                            backdropDismiss: false,
                            buttons: [{
                                    text: 'Retry',
                                    handler: function () {
                                        _this.splashScreen.show();
                                        location.reload();
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
        });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            if (_this.network.type == 'none' || !_this.network.type) {
                //this.presentAlertOffline();
            }
            _this.auth.authenticationState.subscribe(function (state) {
                if (state) {
                    _this.auth.getUserDetails().then(function (val) {
                        if (val) {
                            _this.auth.userDetails.next(val);
                            _this.user_url = val.avatar;
                            _this.user_name = val.displayname;
                            _this.user_email = val.email;
                        }
                    });
                    _this.auth.validateAuthCookie();
                    _this.router.navigateByUrl('/tabs');
                }
                else {
                    _this.router.navigateByUrl('/tutorial');
                }
            });
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.backButtonEvent = function () {
        var _this = this;
        this.platform.backButton.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
            var element, error_1, element, error_2, element, error_3, element, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.actionSheetCtrl.getTop()];
                    case 1:
                        element = _a.sent();
                        if (element) {
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.popoverCtrl.getTop()];
                    case 4:
                        element = _a.sent();
                        if (element) {
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.modalCtrl.getTop()];
                    case 7:
                        element = _a.sent();
                        if (element) {
                            element.dismiss();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.menu.getOpen()];
                    case 10:
                        element = _a.sent();
                        if (element !== null) {
                            this.menu.close();
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 12];
                    case 11:
                        error_4 = _a.sent();
                        return [3 /*break*/, 12];
                    case 12:
                        //console.log('url:', this.router.url);
                        this.routerOutlets.forEach(function (outlet) {
                            if (outlet && outlet.canGoBack()) {
                                outlet.pop();
                            }
                            else if (_this.router.url === '/tabs/home') {
                                console.log('homepage');
                                if (_this.counter == 0) {
                                    _this.counter++;
                                    _this.exitAppToastMsg();
                                    setTimeout(function () { _this.counter = 0; }, 3000);
                                }
                                else {
                                    navigator['app'].exitApp();
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AppComponent.prototype.exitAppToastMsg = function () {
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
    AppComponent.prototype.doLogout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm?',
                            message: 'Are you sure you want to log out?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.auth.logout();
                                        _this.menu.open('end');
                                        _this.menu.enable(false);
                                        _this.router.navigate(['/tutorial']);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChildren(IonRouterOutlet),
        __metadata("design:type", QueryList)
    ], AppComponent.prototype, "routerOutlets", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthenticationService,
            Router,
            MenuController,
            AlertController,
            RestApiService,
            Network,
            ActionSheetController,
            PopoverController,
            ModalController,
            ToastController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map