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
var MyApp = (function () {
    function MyApp(app, platform) {
        this.app = app;
        this.platform = platform;
        this.initializeApp();
        // // used for an example of ngFor and navigation
        // this.pages = [
        //   { title: 'Getting Started', component: GettingStartedPage },
        //   { title: 'List', component: ListPage }
        // ];
        //
        // this.rootPage = GettingStartedPage;
    }
    Object.defineProperty(MyApp, "parameters", {
        get: function () {
            return [[ionic_angular_1.IonicApp], [ionic_angular_1.Platform]];
        },
        enumerable: true,
        configurable: true
    });
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // StatusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // // we wouldn't want the back button to show in this scenario
        // let nav = this.app.getComponent('nav');
        // nav.setRoot(page.component);
    };
    MyApp = __decorate([
        ionic_angular_1.App({
            template: '<ion-content><button large danger round>stuff</button></ion-content>',
            config: {} // http://ionicframework.com/docs/v2/api/config/Config/
        }), 
        __metadata('design:paramtypes', [Object, Object])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.js.map