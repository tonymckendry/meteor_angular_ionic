import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'

import AppState from '../../../../client/app-state';

import {LoginPage} from '../login/login'

import {NavbarComponent} from '../../layouts/navbar/navbar'

@Page({
  templateUrl: 'imports/ui/pages/schedule/schedule.html',
  styleUrls: [require('./schedule.scss')],
  directives: [NavbarComponent]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class SchedulePage extends MeteorComponent {
  store = AppState;

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
       'next is infinite scroll',
       'one more'
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
    Meteor.logout((_response) => {
      // this.nav.setRoot(LoginPage))
      this.store.loggedIn = false;
      console.log(_response);
    });

  }
}
