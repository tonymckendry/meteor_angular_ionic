import {Page} from 'ionic-angular';
import {MeteorComponent} from 'angular2-meteor'
// import {AccountsService} from 'meteor-accounts'

@Page({
  templateUrl: 'imports/ui/pages/login/login.html',
  styleUrls: [require('./login.scss')]
  // template: '<ion-content><h1>hello</h1></ion-content>'
})
export class LoginPage extends MeteorComponent{
  constructor() {
    console.log('this is login page')

    console.log(Meteor.users.find().fetch())

  }

  login(form){
    // Meteor.loginWithPassword(form.value.username, form.value.password).then(function(response){
    //   console.log('Login Success' + response )
    // }, function(_error){
    //   console.log('Login Error')
    // })
    Meteor.loginWithPassword(form.value.username, form.value.password, function(_error){
      if(_error !== undefined){
        console.log('Login error')
      }else{
        console.log('login success')
      }
    })
    // this.accounts.login(form.value.username, form.value.password).then(() => alert ('logged in'))
  }
}
