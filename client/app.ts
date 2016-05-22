/// <reference path="app.d.ts" />

import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController, Nav} from 'ionic-angular';
import {autorun} from 'mobx';
import {GettingStartedPage} from '../imports/ui/pages/getting-started/getting-started';
import {ListPage} from '../imports/ui/pages/list/list';
import AppState from './app-state';


// scope.digest

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
      // { title: 'List', component: ListPage }
    ];
    //
    this.root = GettingStartedPage;
    // this.menu.enable(true, "loggedInMenu");
    // this.nav.setRoot(GettingStartedPage);




  }

  ngAfterViewInit() {
    console.log("The component view has been initialised");
    autorun(() => {
      console.log("autorunning in 'TheApp'");
      if (this.store.loggedIn === true) {
        this.nav.setRoot(GettingStartedPage);
        console.log(this);
      } else {
        this.nav.setRoot(ListPage);
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
