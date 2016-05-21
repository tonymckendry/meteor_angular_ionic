import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController} from 'ionic-angular';
import {GettingStartedPage} from '../imports/ui/pages/getting-started/getting-started';

@App({
  templateUrl: 'imports/ui/layouts/main.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  queries: {
    nav: new ViewChild('content')
  }
})
class TheApp {
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
    // this.rootPage = GettingStartedPage;
    // this.menu.enable(true, "loggedInMenu");
    // this.nav.setRoot(GettingStartedPage);
    this.root = GettingStartedPage;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // // we wouldn't want the back button to show in this scenario
    // let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }
}
