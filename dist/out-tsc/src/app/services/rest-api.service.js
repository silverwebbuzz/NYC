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
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
var httpOptions = {
    headers: new HttpHeaders()
};
var API_URL = "https://go-demo.co/nycwn-new";
var RestApiService = /** @class */ (function () {
    function RestApiService(http, toastCtrl, loadingController, modal) {
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.loadingController = loadingController;
        this.modal = modal;
        this.isLoading = false;
        this.isModalOpen = false;
    }
    RestApiService.prototype.handleError = function (error) {
        //console.log('log : ',error);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            //console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(
            //   `Backend returned code ${error.status}, ` +
            //   `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error.error);
    };
    RestApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    RestApiService.prototype.get = function (URL) {
        var url = API_URL + "/" + URL;
        return this.http.get(url, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.getbyid = function (URL, id) {
        var url = API_URL + "/" + URL + "/" + id;
        return this.http.get(url, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
    };
    RestApiService.prototype.post = function (URL, Body) {
        var url = API_URL + "/" + URL;
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post(url, Body, httpOptions)
            .pipe(catchError(this.handleError));
    };
    RestApiService.prototype.delete = function (URL) {
        var url = API_URL + "/" + URL;
        return this.http.delete(url, httpOptions)
            .pipe(catchError(this.handleError));
    };
    RestApiService.prototype.put = function (URL, Body) {
        var url = API_URL + "/" + URL;
        return this.http.put(url, Body, httpOptions)
            .pipe(catchError(this.handleError));
    };
    RestApiService.prototype.presentToastWithOptions = function (message, cssClass, position) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message ? message : null,
                            duration: 10000,
                            position: position ? position : 'bottom',
                            cssClass: cssClass ? cssClass : 'dark-trans login-toster',
                            closeButtonText: 'OK',
                            showCloseButton: true
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    RestApiService.prototype.presentLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Please wait...',
                                translucent: true,
                                cssClass: 'custom-class custom-loading'
                            }).then(function (a) {
                                a.present().then(function () {
                                    if (!_this.isLoading) {
                                        a.dismiss();
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestApiService.prototype.dismissLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = false;
                        return [4 /*yield*/, this.loadingController.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestApiService.prototype.presentModal = function (PageName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isModalOpen = true;
                        return [4 /*yield*/, this.modal.create({
                                component: PageName,
                            }).then(function (a) {
                                a.present().then(function () {
                                    if (!_this.isModalOpen) {
                                        a.dismiss();
                                    }
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestApiService.prototype.dismissModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isModalOpen = false;
                        return [4 /*yield*/, this.modal.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RestApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, ToastController, LoadingController, ModalController])
    ], RestApiService);
    return RestApiService;
}());
export { RestApiService };
//# sourceMappingURL=rest-api.service.js.map