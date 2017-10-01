import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Shift } from '../../models/shift-model';

@IonicPage({
  name: 'ShiftDetailsPage',
  segment: 'shift-details'
})
@Component({
  selector: 'page-shift-details',
  templateUrl: 'shift-details.html',
})
export class ShiftDetailsPage {

  //shift = {} as Shift;
  shift = {
    date: '01/10/2017',
    company: 'Test',
    deliveries: [],
    transactions: [],
    totalMileage: 500,
    mileageFuelCost: 25,
    hoursWorked: 7,
    grossPay: 666,
    totalEarned: 123
  };

  averageEarned: any = this.shift.totalEarned / this.shift.hoursWorked;

  deliveryDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropdown'
  };

  transactionDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropdown'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    //this.shift = this.navParams.get('shift');
  }

  dropMenu(type: any) {
    if (type === 'delivery') this.deliveryDropdown.isActive = !this.deliveryDropdown.isActive;
    if (type === 'transaction') this.transactionDropdown.isActive = !this.transactionDropdown.isActive;

    this.deliveryDropdown.isActive ? this.deliveryDropdown.arrow = 'arrow-dropup' : this.deliveryDropdown.arrow = 'arrow-dropdown';
    this.transactionDropdown.isActive ? this.transactionDropdown.arrow = 'arrow-dropup' : this.transactionDropdown.arrow = 'arrow-dropdown';
  }

}
