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
import { Validators, FormBuilder } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestApiService } from '../services/rest-api.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TermsPage } from '../terms/terms.page';
var SignupPage = /** @class */ (function () {
    function SignupPage(formBuilder, navCtrl, statusBar, menuCtrl, api, auth, router, modalCtrl) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.menuCtrl = menuCtrl;
        this.api = api;
        this.auth = auth;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.isModalOpen = false;
        this.signup_fb();
    }
    SignupPage.prototype.signup_fb = function () {
        this.signup_form = this.formBuilder.group({
            username: [null, Validators.required],
            email: [null, Validators.compose([
                    Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
                    Validators.required
                ])],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required],
            terms: [null, Validators.compose([Validators.required, Validators.pattern('true')])]
        }, {
            validator: ConfirmPasswordValidator.MatchPassword
        });
    };
    ;
    SignupPage.prototype.ngOnInit = function () {
        this.menuCtrl.enable(false);
        this.statusBar.overlaysWebView(false);
    };
    SignupPage.prototype.webPage = function () {
        console.log('click');
        window.open('https://go-demo.co/nycwn-new/');
    };
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        // Attempt to login in through our User service
        for (var v in this.signup_form.controls) {
            this.signup_form.controls[v].markAsTouched();
        }
        if (this.signup_form.valid) {
            if (!this.signup_form.value.terms) {
                this.api.presentToastWithOptions("Please Accept Our Terms and Agreement and privacy policy.");
                return false;
            }
            console.log('checked', this.signup_form.value.terms);
            var nonceurl = 'api/get_nonce/?controller=user&method=register';
            this.api.presentLoading();
            var body = {
                "username": this.signup_form.value.username,
                "email": this.signup_form.value.email,
                "password": this.signup_form.value.password
            };
            //let register_url = 'api/user/register/?username='+this.signup_form.value.username+'&nonce='+this.token_nonce+'&email='+this.signup_form.value.email+'&password='+this.signup_form.value.password+'';
            this.api.post('wp-json/wp/v2/users/register', body)
                .subscribe(function (data) {
                console.log('data : ', data);
                _this.api.dismissLoading();
                if (data.code == 200) {
                    _this.router.navigate(['/emailverify']);
                }
                else {
                    _this.api.dismissLoading();
                    _this.api.presentToastWithOptions("Something Wrong! Please Try Again or Contact to Administrator.");
                }
            }, function (err) {
                _this.api.dismissLoading();
                _this.api.presentToastWithOptions(err.message);
                console.log('error', err);
            });
            // this.api.post('user/register/', body)
            //   .subscribe(data => {
            //     this.auth.login(data.token);
            //     this.auth.storage.set('user_email', data.user_email);
            //     this.api.dismissLoading();
            //     this.router.navigateByUrl('/home');
            //     console.log('data : ', data);
            //   }, (err) => {
            //     this.api.dismissLoading();
            //     this.api.presentToastWithOptions(err);
            //     console.log('error', err);
            //   });
        }
    };
    SignupPage.prototype.goToLogin = function () {
        this.router.navigate(['/login']);
    };
    SignupPage.prototype.terms_policy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.api.presentModal(TermsPage);
                return [2 /*return*/];
            });
        });
    };
    SignupPage = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NavController,
            StatusBar,
            MenuController,
            RestApiService, AuthenticationService,
            Router,
            ModalController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map