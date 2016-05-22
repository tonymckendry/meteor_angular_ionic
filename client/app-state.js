/// <reference path="app.d.ts" />

import {observable, autorun} from 'mobx';

export default AppState = observable({
  loggedIn: false,
  loginError: false,
  username: "",
  morethings: {
    foo: ""
  }
});

autorun(() => {
  if (AppState.loggedIn === false) {
    console.log("Not logged in");
  } else {
    console.log("Logged in");
  }
})

autorun(() => {
  console.log(AppState.username);
  if (AppState.username.length > 2) {
    AppState.loggedIn = true;
  } else {
    AppState.loggedIn = false;
  }
})
