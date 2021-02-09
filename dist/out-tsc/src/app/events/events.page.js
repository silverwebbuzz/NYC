var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from '../component/calendar/calendar.component';
var EventsPage = /** @class */ (function () {
    function EventsPage(alertCtrl, locale) {
        this.alertCtrl = alertCtrl;
        this.locale = locale;
        this.event = {
            title: '',
            desc: '',
            startTime: '',
            endTime: '',
            allDay: false
        };
        this.minDate = new Date().toISOString();
        this.eventSource = [];
        this.calendar = {
            mode: 'month',
            currentDate: new Date(),
        };
        this.optionsMulti = {
            color: 'secondary',
            daysConfig: [{
                    date: new Date(),
                    //subTitle: 'H.Nay',
                    // disable: true,
                    cssClass: 'dayOff'
                },
                {
                    date: new Date('2018-09-28'),
                    // disable:true,
                    //subTitle: 'Nghỉ',
                    marked: true,
                    cssClass: 'dayOff'
                }],
        };
    }
    EventsPage.prototype.ngOnInit = function () {
        this.resetEvent();
    };
    // getDaysOfMonth() {
    //   this.daysInThisMonth = new Array();
    //   this.daysInLastMonth = new Array();
    //   this.daysInNextMonth = new Array();
    //   this.currentMonth = this.monthNames[this.date.getMonth()];
    //   this.currentYear = this.date.getFullYear();
    //   if(this.date.getMonth() === new Date().getMonth()) {
    //     this.currentDate = new Date().getDate();
    //   } else {
    //     this.currentDate = 999;
    //   }
    //   var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    //   var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    //   for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
    //     this.daysInLastMonth.push(i);
    //   }
    //   var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    //   for (var i = 0; i < thisNumOfDays; i++) {
    //     this.daysInThisMonth.push(i+1);
    //   }
    //   var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    //   var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    //   for (var i = 0; i < (6-lastDayThisMonth); i++) {
    //     this.daysInNextMonth.push(i+1);
    //   }
    //   var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    //   if(totalDays<36) {
    //     for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
    //       this.daysInNextMonth.push(i);
    //     }
    //   }
    // }
    // goToLastMonth() {
    //   this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    //   this.getDaysOfMonth();
    // }
    // goToNextMonth() {
    //   this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    //   this.getDaysOfMonth();
    // }
    EventsPage.prototype.resetEvent = function () {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            allDay: false
        };
    };
    // Create the right event format and reload source
    EventsPage.prototype.addEvent = function () {
        var eventCopy = {
            title: this.event.title,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            allDay: this.event.allDay,
            desc: this.event.desc
        };
        if (eventCopy.allDay) {
            var start = eventCopy.startTime;
            var end = eventCopy.endTime;
            eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
            eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
    };
    EventsPage.prototype.next = function () {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    };
    EventsPage.prototype.back = function () {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    };
    // Change between month/week/day
    EventsPage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    // Focus today
    EventsPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    // Selected date reange and hence title changed
    EventsPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    // Calendar event was clicked
    EventsPage.prototype.onEventSelected = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var start, end, alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = formatDate(event.startTime, 'medium', this.locale);
                        end = formatDate(event.endTime, 'medium', this.locale);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: event.title,
                                subHeader: event.desc,
                                message: 'From: ' + start + '<br><br>To: ' + end,
                                buttons: ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Time slot was clicked
    EventsPage.prototype.onTimeSelected = function (ev) {
        var selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());
    };
    __decorate([
        ViewChild(CalendarComponent),
        __metadata("design:type", CalendarComponent)
    ], EventsPage.prototype, "myCal", void 0);
    EventsPage = __decorate([
        Component({
            selector: 'app-events',
            templateUrl: './events.page.html',
            styleUrls: ['./events.page.scss'],
        }),
        __param(1, Inject(LOCALE_ID)),
        __metadata("design:paramtypes", [AlertController, String])
    ], EventsPage);
    return EventsPage;
}());
export { EventsPage };
//# sourceMappingURL=events.page.js.map