import {Component} from '@angular/core'

import AppState from '../../../../client/app-state';

@Component({
  selector: 'navbar',
  templateUrl: 'imports/ui/layouts/navbar/navbar.html'
})

export class NavbarComponent{
  
  logout(){
    Meteor.logout((_response) => {
      // this.nav.setRoot(LoginPage))
      this.store.loggedIn = false;
      console.log(_response);
    });

  }
}
