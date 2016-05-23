/// <reference path="app.d.ts" />
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
var core_1 = require('@angular/core');
var mobx_1 = require('mobx');
var getting_started_1 = require('../imports/ui/pages/getting-started/getting-started');
var login_1 = require('../imports/ui/pages/login/login');
var schedule_1 = require('../imports/ui/pages/schedule/schedule');
var app_state_1 = require('./app-state');
var TheApp = (function () {
    function TheApp(events, platform, menu) {
        var _this = this;
        this.store = app_state_1.default;
        this.events = events;
        this.menu = menu;
        platform.ready().then(function () {
            console.log("yeah boy!");
            console.log(_this.store.loggedIn);
            // this.store.loggedIn = true;
            // console.log(this.store.loggedIn);
        });
        // this.app = app;
        // this.platform = platform;
        // this.initializeApp(events, platform, menu);
        // // used for an example of ngFor and navigation
        this.appPages = [
            { title: 'Getting Started', component: getting_started_1.GettingStartedPage },
            { title: 'Schedule', component: schedule_1.SchedulePage }
        ];
        //
        this.root = login_1.LoginPage;
        // this.menu.enable(true, "loggedInMenu");
        // this.nav.setRoot(GettingStartedPage);
    }
    Object.defineProperty(TheApp, "parameters", {
        get: function () {
            return [
                [ionic_angular_1.Events], [ionic_angular_1.Platform], [ionic_angular_1.MenuController]
            ];
        },
        enumerable: true,
        configurable: true
    });
    TheApp.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log("The component view has been initialised");
        mobx_1.autorun(function () {
            console.log("autorunning in 'TheApp'");
            if (_this.store.loggedIn === true) {
                _this.nav.setRoot(schedule_1.SchedulePage);
                console.log(_this);
            }
            else {
                _this.nav.setRoot(login_1.LoginPage);
                console.log("setting to the listpage");
            }
        });
    };
    TheApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // // we wouldn't want the back button to show in this scenario
        // let nav = this.app.getComponent('nav');
        this.nav.setRoot(page.component);
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav), 
        __metadata('design:type', ionic_angular_1.Nav)
    ], TheApp.prototype, "nav", void 0);
    TheApp = __decorate([
        ionic_angular_1.App({
            templateUrl: 'imports/ui/layouts/main.html',
            config: {},
        }), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], TheApp);
    return TheApp;
}());
//# sourceMappingURL=app.js.map