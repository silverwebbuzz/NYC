var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { RestApiService } from './rest-api.service';
var TOKEN_KEY = 'auth-token';
var NETWORK_TYPE = 'network-type';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storage, plt, api) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.api = api;
        this.NetworktypeState = new BehaviorSubject('Public');
        this.authenticationState = new BehaviorSubject(false);
        this.userDetails = new BehaviorSubject(null);
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    AuthenticationService.prototype.checkToken = function () {
        var _this = this;
        this.storage.get(TOKEN_KEY).then(function (res) {
            if (res) {
                _this.authenticationState.next(true);
            }
        });
    };
    AuthenticationService.prototype.login = function (TOKEN_VALUE) {
        this.storage.set(TOKEN_KEY, "" + TOKEN_VALUE);
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        this.storage.remove(TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.setNetworkType = function (TYPE_VALUE) {
        console.log('TYPE_VALUE:', TYPE_VALUE);
        this.NetworktypeState.next(TYPE_VALUE);
    };
    AuthenticationService.prototype.generateNonce = function () {
        return this.api.get('api/get_nonce/?controller=user&method=generate_auth_cookie')
            .subscribe(function (data) {
            if (data) {
                return data.nonce;
            }
        });
    };
    AuthenticationService.prototype.validateAuthCookie = function () {
        var _this = this;
        return this.storage.get('Auth_Cookie').then(function (res) {
            if (res) {
                var URL_1 = 'api/user/validate_auth_cookie/?cookie=' + ("" + res);
                return _this.api.get(URL_1)
                    .subscribe(function (data) {
                    if (data.valid == false) {
                        _this.generateAuthCookie();
                    }
                });
            }
        });
    };
    AuthenticationService.prototype.generateAuthCookie = function (userDetails) {
        var _this = this;
        //this.generateNonce();
        if (userDetails) {
            var URL_2 = 'api/user/generate_auth_cookie/?username=' + ("" + userDetails.email) + '&password=' + ("" + userDetails.password);
            this.api.get(URL_2)
                .subscribe(function (data) {
                console.log('AuthCate12:', data);
                if (data) {
                    _this.storage.set('Auth_Cookie', data.cookie);
                    _this.setUserDetails(data.user).then(function (res) {
                        _this.authenticationState.next(true);
                    });
                }
            }, function (err) {
                _this.api.presentToastWithOptions(err.error);
            });
        }
        else {
            this.getUser()
                .then(function (res) {
                console.log('state3:', res);
                if (res) {
                    var URL_3 = 'api/user/generate_auth_cookie/?username=' + ("" + res.email) + '&password=' + ("" + res.password);
                    _this.api.get(URL_3)
                        .subscribe(function (data) {
                        console.log('AuthCate23:', data);
                        if (data) {
                            _this.storage.set('Auth_Cookie', data.cookie);
                            _this.setUserDetails(data.user).then(function (res) {
                                _this.authenticationState.next(true);
                            });
                        }
                    }, function (err) {
                        _this.api.presentToastWithOptions(err.error);
                    });
                }
            });
        }
    };
    AuthenticationService.prototype.setUserDetails = function (userDetails) {
        return this.storage.set('UserDetails', userDetails);
    };
    AuthenticationService.prototype.getUserDetails = function () {
        return this.storage.get('UserDetails');
    };
    AuthenticationService.prototype.getUser = function () {
        return this.storage.get('User');
    };
    AuthenticationService.prototype.setUser = function (user) {
        this.storage.set('User', user);
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage, Platform,
            RestApiService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map