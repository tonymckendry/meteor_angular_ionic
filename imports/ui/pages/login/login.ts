import {ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'
// import {GettingStartedPage} from '../getting-started/getting-started'
import {SchedulePage} from '../schedule/schedule';
import AppState from '../../../../client/app-state';

@Page({
  templateUrl: 'imports/ui/pages/login/login.html',
  styleUrls: [require('./login.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginPage extends MeteorComponent{
  store = AppState;

  constructor(private cd: ChangeDetectorRef) {
    super();

    // console.log(Meteor.users.find().fetch())

  }

  login(form){
    Meteor.loginWithPassword(form.value.username, form.value.password, (_error) => {
      if(_error !== undefined){
        console.log('Login error')
        this.store.loggedIn = false;
        this.store.loginError = true;
      }else{
        console.log('login success')
        this.store.loggedIn = true;
        this.store.loginError = false;
        // this.nav.setRoot(SchedulePage)
      }
      this.cd.markForCheck();
      this.cd.detectChanges();
    })
  }
}
