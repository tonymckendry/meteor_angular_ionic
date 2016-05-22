import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'
// import {GettingStartedPage} from '../getting-started/getting-started'
import {SchedulePage} from '../schedule/schedule';

@Page({
  templateUrl: 'imports/ui/pages/login/login.html',
  styleUrls: [require('./login.scss')]
})

export class LoginPage extends MeteorComponent{
  loginError;
  constructor(nav:NavController) {
    this.nav = nav;
    console.log('this is login page')
    super();
    this.loginError = false;
    // console.log(Meteor.users.find().fetch())

  }

  login(form){
    Meteor.loginWithPassword(form.value.username, form.value.password, (_error) => {
      if(_error !== undefined){
        this.loginError = true;
        console.log('Login error - loginError is: ' + this.loginError)
      }else{
        console.log('login success')
        this.nav.setRoot(SchedulePage)
      }
    })
  }
}
