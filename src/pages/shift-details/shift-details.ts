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

  shift = {} as Shift;
  averageEarned: any = this.shift.totalEarned / this.shift.hoursWorked;

  deliveryDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropright'
  };

  transactionDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropright'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.shift = this.navParams.get('shift');
  }

  dropMenu(type: any) {
    if (type === 'delivery') this.deliveryDropdown.isActive = !this.deliveryDropdown.isActive
    else if (type === 'transaction') this.transactionDropdown.isActive = !this.transactionDropdown.isActive;

    if (this.deliveryDropdown.isActive) this.deliveryDropdown.arrow = 'arrow-dropdown'
    else this.deliveryDropdown.arrow = 'arrow-dropright';

    if (this.transactionDropdown.isActive) this.transactionDropdown.arrow = 'arrow-dropdown'
    else this.deliveryDropdown.arrow = 'arrow-dropright';
  }

}
