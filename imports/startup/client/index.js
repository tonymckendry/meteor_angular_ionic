import { Tracker } from 'meteor/tracker'

Tracker.autorun(function(){
  if(Meteor.user() && Meteor.user().profile.zuus.isManager){
    AppState.isManager = true;
  }
  else{
    AppState.isManager = false; 
  }
})
