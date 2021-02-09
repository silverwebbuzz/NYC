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
import { NavParams, PopoverController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';
var ReactionComponent = /** @class */ (function () {
    function ReactionComponent(restProvider, popCtrl, navParams) {
        this.restProvider = restProvider;
        this.popCtrl = popCtrl;
        this.navParams = navParams;
        this.allrecation = this.navParams.get('allrecation');
        console.log('Reaction:', this.allrecation);
    }
    ReactionComponent.prototype.ngOnInit = function () {
    };
    ReactionComponent.prototype.like = function (index) {
        var typeLike = index;
        this.popCtrl.dismiss(typeLike);
    };
    ReactionComponent = __decorate([
        Component({
            selector: 'app-reaction',
            templateUrl: './reaction.component.html',
            styleUrls: ['./reaction.component.scss']
        }),
        __metadata("design:paramtypes", [RestApiService, PopoverController, NavParams])
    ], ReactionComponent);
    return ReactionComponent;
}());
export { ReactionComponent };
//# sourceMappingURL=reaction.component.js.map