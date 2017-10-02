import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Shift } from '../../models/shift-model';

import { ShiftProvider } from '../../providers/shift/shift-provider';

@IonicPage({
  name: 'ShiftDetailsPage',
  segment: 'shift-details'
})
@Component({
  selector: 'page-shift-details',
  templateUrl: 'shift-details.html',
})
export class ShiftDetailsPage {

  // shift = {
  //   date: '01/10/2017',
  //   company: {name: 'Test'},
  //   deliveries: [
  //     {paymentType: 'Paid', tipAmount: 5, totalEarned: 7},
  //     {paymentType: 'Paid', tipAmount: 5, totalEarned: 7},
  //     {paymentType: 'Paid', tipAmount: 5, totalEarned: 7},
  //     {paymentType: 'Paid', tipAmount: 5, totalEarned: 7}
  //   ],
  //   transactions: [
  //     {type: 'Bonus', amount: 5, notes: 'Hello'},
  //     {type: 'Bonus', amount: 5, notes: 'Hello'},
  //     {type: 'Bonus', amount: 5, notes: 'Hello'}
  //   ],
  //   totalMileage: 500,
  //   mileageFuelCost: 25,
  //   hoursWorked: 7,
  //   grossPay: 666,
  //   totalEarned: 123
  // };

  shift = {} as Shift;
  index: number;
  averageEarned: any;

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
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private shiftProvider: ShiftProvider
  ) {
    this.shift = this.navParams.get('shift');
    this.index = this.navParams.get('index');
    this.averageEarned = this.shift.totalEarned / this.shift.hoursWorked;
  }

  dropMenu(type: any) {
    if (type === 'delivery') this.deliveryDropdown.isActive = !this.deliveryDropdown.isActive;
    if (type === 'transaction') this.transactionDropdown.isActive = !this.transactionDropdown.isActive;

    this.deliveryDropdown.isActive ? this.deliveryDropdown.arrow = 'arrow-dropup' : this.deliveryDropdown.arrow = 'arrow-dropdown';
    this.transactionDropdown.isActive ? this.transactionDropdown.arrow = 'arrow-dropup' : this.transactionDropdown.arrow = 'arrow-dropdown';
  }

  goBack() {
    this.navCtrl.setRoot('EarningsPage');
  }

  presentDeleteConfirmation() {
    const alert = this.alertCtrl.create({
      title: 'Delete Shift',
      message: 'Please confirm deletion of this shift.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.shiftProvider.delete(this.index);
            this.goBack();
          }
        }
      ]
    });
    alert.present();
  }

}
