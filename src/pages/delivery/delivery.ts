import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Delivery } from '../../models/delivery-model';
import { DeliveryProvider } from '../../providers/delivery/delivery-provider';
import { ShiftProvider } from '../../providers/shift/shift-provider';

@IonicPage({
  name: 'DeliveryPage',
  segment: 'delivery'
})
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  delivery = {} as Delivery;
  isPaid: boolean = false;
  isNotPaid: boolean = false;
  cashGiven: number;
  orderAmount: number;
  buttonText = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deliveryProvider: DeliveryProvider,
    private shiftProvider: ShiftProvider
  ) {
    // If a delivery has been passed in then we update the fields associated
    // with the delivery selected and change the button text to display update
    if (this.navParams.get('delivery')) {
      this.buttonText = 'Update';
      this.delivery = this.navParams.get('delivery');

      if (this.navParams.get('paymentType').toLowerCase() === 'paid') {
        this.isPaid = true;
        this.isNotPaid = false;
      } else if (this.navParams.get('paymentType').toLowerCase() === 'not-paid') {
        this.isPaid = false;
        this.isNotPaid = true;
      }

    } else {
      this.buttonText = 'Add Delivery'
    }

  }

  addDelivery() {
    this.delivery.tipAmount = Number(this.delivery.tipAmount);
    this.calculateTotal(this.delivery.paymentType);
    if (this.navParams.get('delivery')) {
      this.editDelivery()
      return;
    }
    this.deliveryProvider.addDelivery(this.delivery);
    this.navCtrl.setRoot('ShiftPage');
  }

  editDelivery() {
    // Pass the index of current delivery as well as the updated version
    this.deliveryProvider.editDelivery(this.navParams.get('index'), this.delivery);
    this.navCtrl.setRoot('ShiftPage');
  }

  deleteDelivery() {

  }

  calculateTotal(paymentType: any) {
    var deliveryCharge = this.shiftProvider.getCurrentShift().company.deliveryCharge;

    if (paymentType.toLowerCase() === 'paid') {
      this.delivery.total = this.delivery.tipAmount + deliveryCharge;
    } else if (paymentType.toLowerCase() === 'not-paid') {
      this.delivery.tipAmount = this.delivery.cashGiven - this.delivery.orderAmount;
      this.delivery.total = this.delivery.tipAmount + deliveryCharge;
    }
  }

  onChange() {
    if (this.delivery.paymentType.toLowerCase() === 'paid') {
      this.isPaid = true;
      this.isNotPaid = false;
    } else if (this.delivery.paymentType.toLowerCase() === 'not-paid') {
      this.isPaid = false;
      this.isNotPaid = true;
    }
  }

  cancel() {
    this.navCtrl.setRoot('ShiftPage');
  }


}
