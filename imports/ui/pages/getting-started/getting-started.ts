import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'imports/ui/pages/getting-started/getting-started.html'
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class GettingStartedPage {
  constructor() {
    console.log('this is logging')

  }
}
