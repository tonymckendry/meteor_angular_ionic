import {Page, NavController} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'
// import {GettingStartedPage} from '../getting-started/getting-started'
import {Schedule} from '../schedule/schedule'

@Page({
  templateUrl: 'imports/ui/pages/login/login.html',
  styleUrls: [require('./login.scss')]
})

export class LoginPage extends MeteorComponent{
  constructor(nav:NavController) {
    this.nav = nav;
    console.log('this is login page')
    super();
    // console.log(Meteor.users.find().fetch())

  }

  login(form){
    Meteor.loginWithPassword(form.value.username, form.value.password, (_error) => {
      if(_error !== undefined){
        console.log('Login error')
      }else{
        console.log('login success')
        // console.log(this)
        this.nav.push(Schedule)
      }
    })
    // this.nav.push(GettingStartedPage)
  }
  // login(){
  //   this.nav.push(GettingStartedPage)
  // }
}
