import {Component} from '@angular/core'

import AppState from '../../../../client/app-state';

@Component({
  selector: 'navbar',
  templateUrl: 'imports/ui/layouts/navbar/navbar.html'
})

export class NavbarComponent{
  store = AppState; 
}
