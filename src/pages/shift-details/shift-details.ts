import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name: 'ShiftDetailsPage',
  segment: 'shift-details'
})
@Component({
  selector: 'page-shift-details',
  templateUrl: 'shift-details.html',
})
export class ShiftDetailsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    
  }



}
