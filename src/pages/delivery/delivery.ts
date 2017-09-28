import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Delivery } from '../../models/delivery-model';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }


}
