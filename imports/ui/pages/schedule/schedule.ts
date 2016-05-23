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
     console.log("this is the faker data")
     console.log(faker)
     let numberOfUnits = 100;
     // Make some fake units.
                console.log("Creating units...");
                let units = []
                for (let i = 0; i < numberOfUnits; i++) {
                    let u = {
                        name: faker.address.city(),
                        id: faker.random.number(),
                        // timezone: randomElement(tz),
                        lnglat: [Number(faker.address.longitude()), Number(faker.address.latitude())],
                    }
                    units.push(u)
                }

                this.units = units
                console.log("these are the units that are created:")
                console.log(units)

   }

   doInfinite(infiniteScroll) {
     console.log('Begin async operation');

     setTimeout(() => {
       for (var i = 0; i < 20; i++) {
         this.units.push( this.units.length );
       }

       console.log('Async operation has ended');
       infiniteScroll.complete();
     }, 500);
   }

 getItems(searchbar) {
   this.initializeItems();
   var q = searchbar.value;
   if (q.trim() == '') {
     return;
   }
   this.units = this.units.filter((v) => {
     if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       return true;
     }
     return false;
   })
  }
}
