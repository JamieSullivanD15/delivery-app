import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'ShiftPage',
  segment: 'shift'
})
@Component({
  selector: 'page-shift',
  templateUrl: 'shift.html',
})
export class ShiftPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShiftPage');
  }

}
