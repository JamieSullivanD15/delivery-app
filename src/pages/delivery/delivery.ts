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
  deliveryOrderAmount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deliveryProvider: DeliveryProvider,
    private shiftProvider: ShiftProvider
  ) {

  }

  addDelivery() {
    this.calculateTotal(this.delivery.paymentType);
    this.delivery.tipAmount = Number(this.delivery.tipAmount);
    this.deliveryProvider.addDelivery(this.delivery);
    this.navCtrl.setRoot('ShiftPage');
  }

  editDelivery() {

  }

  deleteDelivery() {

  }

  calculateTotal(paymentType: any) {
    var deliveryCharge = this.shiftProvider.getCurrentShift().company.deliveryCharge;
    this.delivery.tipAmount = Number(this.delivery.tipAmount);

    if (paymentType.toLowerCase() === 'paid') {
      this.delivery.total = this.delivery.tipAmount + deliveryCharge;
    } else if (paymentType.toLowerCase() === 'not-paid') {
      this.delivery.tipAmount = this.cashGiven - this.deliveryOrderAmount;
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

  }


}
