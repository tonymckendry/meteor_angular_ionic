/// <reference path="app.d.ts" />

import {App, Events, Platform, MenuController, Nav} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {autorun} from 'mobx';
import {GettingStartedPage} from '../imports/ui/pages/getting-started/getting-started';
import {LoginPage} from '../imports/ui/pages/login/login';
import {SchedulePage} from '../imports/ui/pages/schedule/schedule'
import AppState from './app-state';

@App({
  templateUrl: 'imports/ui/layouts/main.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  // queries: {
  //   nav: new ViewChild('content')
  // }
})
class TheApp implements AfterViewInit {
  @ViewChild(Nav) nav: Nav;
  store = AppState;

  static get parameters() {
    return [
      [Events], [Platform], [MenuController]
    ]
  }

  constructor(events, platform, menu) {
    this.events = events;
    this.menu = menu;


    platform.ready().then(() => {
      console.log("yeah boy!");
      console.log(this.store.loggedIn);
      // this.store.loggedIn = true;
      // console.log(this.store.loggedIn);
    })
    // this.app = app;
    // this.platform = platform;

    // this.initializeApp(events, platform, menu);

    // // used for an example of ngFor and navigation
    this.appPages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'Schedule', component: SchedulePage }
    ];
    //
    this.root = LoginPage;
    // this.menu.enable(true, "loggedInMenu");
    // this.nav.setRoot(GettingStartedPage);




  }

  ngAfterViewInit() {
    console.log("The component view has been initialised");
    autorun(() => {
      console.log("autorunning in 'TheApp'");
      if (this.store.loggedIn === true) {
        this.nav.setRoot(SchedulePage);
        console.log(this);
      } else {
        this.nav.setRoot(LoginPage);
        console.log("setting to the listpage")
      }
    })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // // we wouldn't want the back button to show in this scenario
    // let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }
}
