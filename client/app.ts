import {App, Events, Platform, MenuController, Nav} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'
import {ViewChild} from '@angular/core';

import {GettingStartedPage} from '../imports/ui/pages/getting-started/getting-started';
import {LoginPage} from '../imports/ui/pages/login/login';
import {SchedulePage} from '../imports/ui/pages/schedule/schedule'

@App({
  templateUrl: 'imports/ui/layouts/main.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/

})
class TheApp extends MeteorComponent{
  @ViewChild(Nav) nav: Nav;
  static get parameters() {
    return [
      [Events], [Platform], [MenuController]
    ]
  }
  constructor(events, platform, menu) {
    super();
    this.events = events;
    this.menu = menu;


    platform.ready().then(() => {
      console.log("yeah boy!");
    })
    // this.app = app;
    // this.platform = platform;

    // this.initializeApp(events, platform, menu);

    // // used for an example of ngFor and navigation
    this.appPages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'Login', component: LoginPage },
      { title: 'Schedule', component: SchedulePage }
    ];
    //
    // this.rootPage = GettingStartedPage;
    // this.menu.enable(true, "loggedInMenu");
    // this.nav.setRoot(GettingStartedPage);
    this.root = LoginPage;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // // we wouldn't want the back button to show in this scenario
    // let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }
}
