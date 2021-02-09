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
import { RestApiService } from '../services/rest-api.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { OptionsconnectionsComponent } from '../component/optionsconnections/optionsconnections.component';
var NetworksPage = /** @class */ (function () {
    function NetworksPage(api, auth, router, popoverController) {
        var _this = this;
        this.api = api;
        this.auth = auth;
        this.router = router;
        this.popoverController = popoverController;
        this.all_members = [];
        this.auth.userDetails
            .subscribe(function (res) {
            if (res) {
                _this.user_url = res.avatar;
                _this.user_id = res.id;
                console.log(res);
            }
            _this.getapiCall();
        });
    }
    NetworksPage.prototype.ngOnInit = function () {
        //this.menu.enable(true);
        //this.statusBar.overlaysWebView(false);
    };
    NetworksPage.prototype.getapiCall = function () {
        var _this = this;
        this.api.presentLoading();
        this.api.get('wp-json/my-route/v1/allmembersdir/' + this.user_id)
            .subscribe(function (data) {
            _this.api.dismissLoading();
            if (data) {
                _this.all_members = data.allmembers;
            }
        });
    };
    NetworksPage.prototype.conversationPage = function () {
        this.router.navigate(['/conversation']);
    };
    NetworksPage.prototype.gotoProfile = function () {
        this.router.navigate(['/profile']);
    };
    NetworksPage.prototype.userProfile = function (friendid) {
        var url = '/userprofile/' + friendid + '/' + this.user_id;
        this.router.navigateByUrl(url);
    };
    NetworksPage.prototype.membersPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: OptionsconnectionsComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NetworksPage = __decorate([
        Component({
            selector: 'app-networks',
            templateUrl: './networks.page.html',
            styleUrls: ['./networks.page.scss'],
        }),
        __metadata("design:paramtypes", [RestApiService,
            AuthenticationService,
            Router,
            PopoverController])
    ], NetworksPage);
    return NetworksPage;
}());
export { NetworksPage };
//# sourceMappingURL=networks.page.js.map