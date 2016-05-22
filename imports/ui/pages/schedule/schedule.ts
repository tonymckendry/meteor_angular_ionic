import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'imports/ui/pages/schedule/schedule.html',
  styleUrls: [require('./schedule.scss')]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class SchedulePage {
  constructor() {
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
}
