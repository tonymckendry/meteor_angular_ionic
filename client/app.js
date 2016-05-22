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
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var getting_started_1 = require('../imports/ui/pages/getting-started/getting-started');
var login_1 = require('../imports/ui/pages/login/login');
var TheApp = (function () {
    function TheApp(events, platform, menu) {
        this.events = events;
        this.menu = menu;
        platform.ready().then(function () {
            console.log("yeah boy!");
        });
        // this.app = app;
        // this.platform = platform;
        // this.initializeApp(events, platform, menu);
        // // used for an example of ngFor and navigation
        this.appPages = [
            { title: 'Getting Started', component: getting_started_1.GettingStartedPage },
            { title: 'Login', component: login_1.LoginPage }
        ];
        //
        // this.rootPage = GettingStartedPage;
        // this.menu.enable(true, "loggedInMenu");
        // this.nav.setRoot(GettingStartedPage);
        this.root = login_1.LoginPage;
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
    TheApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // // we wouldn't want the back button to show in this scenario
        // let nav = this.app.getComponent('nav');
        this.nav.setRoot(page.component);
    };
    TheApp = __decorate([
        ionic_angular_1.App({
            templateUrl: 'imports/ui/layouts/main.html',
            config: {},
            queries: {
                nav: new core_1.ViewChild('content')
            }
        }), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], TheApp);
    return TheApp;
}());
//# sourceMappingURL=app.js.map