var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';
var ForgotpasswordPage = /** @class */ (function () {
    function ForgotpasswordPage(formBuilder, api) {
        this.formBuilder = formBuilder;
        this.api = api;
        this.fp_login_form();
    }
    ForgotpasswordPage.prototype.fp_login_form = function () {
        this.fp_form = this.formBuilder.group({
            email: [null, Validators.compose([
                    Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
                    Validators.required
                ])]
        });
    };
    ;
    ForgotpasswordPage.prototype.ngOnInit = function () {
    };
    ForgotpasswordPage.prototype.Sendemail = function () {
        var _this = this;
        for (var v in this.fp_form.controls) {
            this.fp_form.controls[v].markAsTouched();
        }
        if (this.fp_form.valid) {
            this.api.presentLoading();
            var url = 'api/user/retrieve_password/?user_login=' + ("" + this.fp_form.value.email);
            this.api.get(url)
                .subscribe(function (data) {
                _this.api.dismissLoading();
                _this.api.presentToastWithOptions("Please check your email we have sent a reset password link.");
            }, function (err) {
                _this.api.dismissLoading();
                if (err.status == 'error') {
                    _this.api.presentToastWithOptions(err.error);
                }
                else {
                    _this.api.presentToastWithOptions("Something went wrong please try Again!");
                }
            });
        }
    };
    ForgotpasswordPage = __decorate([
        Component({
            selector: 'app-forgotpassword',
            templateUrl: './forgotpassword.page.html',
            styleUrls: ['./forgotpassword.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder,
            RestApiService])
    ], ForgotpasswordPage);
    return ForgotpasswordPage;
}());
export { ForgotpasswordPage };
//# sourceMappingURL=forgotpassword.page.js.map