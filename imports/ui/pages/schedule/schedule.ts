import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'

import {LoginPage} from '../login/login'

@Page({
  templateUrl: 'imports/ui/pages/schedule/schedule.html',
  styleUrls: [require('./schedule.scss')]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class SchedulePage extends MeteorComponent {
  constructor(nav:NavController) {
    super()
    this.nav = nav;
    console.log('this is logging on the schedule component')
    this.searchQuery = '';
    this.initializeItems();
  }

   initializeItems() {
     this.items = [
       'Amsterdam',
       'Bogota',
       'Dude',
       'this is fake data',
       'need to put in faker.js',
       'next is infinite scroll'
     ];

   }

 getItems(searchbar) {
   this.initializeItems();
   var q = searchbar.value;
   if (q.trim() == '') {
     return;
   }
   this.items = this.items.filter((v) => {
     if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       return true;
     }
     return false;
   })
  }

  logout(){
    Meteor.logout((_response) => this.nav.setRoot(LoginPage))
  }
}
