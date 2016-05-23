import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'

import AppState from '../../../../client/app-state';

import {LoginPage} from '../login/login'

import {NavbarComponent} from '../../layouts/navbar/navbar'
import {ManagerComponent} from "./manager/manager";
import {StaffComponent} from "./staff/staff";

@Page({
  templateUrl: 'imports/ui/pages/schedule/schedule.html',
  styleUrls: [require('./schedule.scss')],
  directives: [NavbarComponent, ManagerComponent, StaffComponent]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class SchedulePage extends MeteorComponent {
  store = AppState;

  constructor(nav:NavController) {
    super()
    this.store.pageTitle = 'Schedule';
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

   console.log(q);
   if (q === "") {
     console.log("short circuit if there is nothing to filter by");
     return this.items;
   }

   this.items = this.items.filter((v) => {
     if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       return true;
     }
     return false;
   })
  }


}
