/// <reference path="../../../../client/app.d.ts" />

import {Input, ViewChild} from '@angular/core';
import {Page} from 'ionic-angular';
// import {Observable} from 'rxjs';
import {Control} from '@angular/common';
import AppState from '../../../../client/app-state';
import {autorun} from 'mobx';

@Page({
  templateUrl: 'imports/ui/pages/getting-started/getting-started.html',
  // template: '<ion-content><h1>hello</h1></ion-content>'
  // directives: [AppState]
})
export class GettingStartedPage {
  store = AppState;
  inputtedText = new Control();
  // @ViewChild('txt') nastyTxt;

  constructor() {
    console.log('this is logging')
    console.log(this.store.loggedIn);

    this.inputtedText.valueChanges
                      .subscribe((txt) => {
                        // console.log(txt);
                        this.store.username = txt;
                      });

    // var textInput = $("#txt");
    //
    // $("#txt").keydown(function(e) {
    //   console.log(e);
    // });

    // var txInput = Observable.fromEvent(textInput, "keyup")
    //   .map((e) => {
    //     console.log("mapping");
    //     return e.target.value;
    //   });
    //
    // txInput.subscribe((evt) => console.log(evt));
    //
    // console.log("rx observable installed");
    // console.log(txInput);
    // console.log(textInput);
    // autorun(()=> {
    //   console.log("state change");
    // });
    // this.store.subscribe(() => {
    //   console.log("ummm");
    // })
  }

  // ngAfterViewInit() {
  //   console.log(this.nastyTxt);
  // }

}
