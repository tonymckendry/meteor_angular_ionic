"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_meteor_1 = require('angular2-meteor');
// import {GettingStartedPage} from '../getting-started/getting-started'
var schedule_1 = require('../schedule/schedule');
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(nav) {
        this.nav = nav;
        console.log('this is login page');
        _super.call(this);
        // console.log(Meteor.users.find().fetch())
    }
    LoginPage.prototype.login = function (form) {
        var _this = this;
        Meteor.loginWithPassword(form.value.username, form.value.password, function (_error) {
            if (_error !== undefined) {
                console.log('Login error');
            }
            else {
                console.log('login success');
                _this.nav.push(schedule_1.SchedulePage);
            }
        });
    };
    LoginPage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'imports/ui/pages/login/login.html',
            styleUrls: [require('./login.scss')]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], LoginPage);
    return LoginPage;
}(angular2_meteor_1.MeteorComponent));
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map