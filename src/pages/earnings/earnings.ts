import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Shift } from '../../models/shift-model';

import { ShiftProvider } from '../../providers/shift/shift-provider';

@IonicPage({
  name: 'EarningsPage',
  segment: 'earnings'
})
@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class EarningsPage {

  myDate: any;
  shifts = Array<Shift>();
  // shifts = [
  //   {
  //     date: '01/10/2017',
  //     totalEarned: 500
  //   }
  // ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shiftProvider: ShiftProvider
  ) {
    this.shifts = this.shiftProvider.getShifts();
  }

  read(shift, i) {
    this.navCtrl.setRoot('ShiftDetailsPage', {
      shift: shift, index: i
    });
  }


}
