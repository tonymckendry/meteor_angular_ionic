import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'imports/ui/pages/schedule/schedule.html',
  styleUrls: [require('./schedule.scss')]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class SchedulePage {
  constructor() {
    console.log('this is logging on the schedule component')

  }
}
