"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var SchedulePage = (function () {
    function SchedulePage() {
        console.log('this is logging on the schedule component');
    }
    SchedulePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'imports/ui/pages/schedule/schedule.html',
            styleUrls: [require('./schedule.scss')]
        }), 
        __metadata('design:paramtypes', [])
    ], SchedulePage);
    return SchedulePage;
}());
exports.SchedulePage = SchedulePage;
//# sourceMappingURL=schedule.js.map