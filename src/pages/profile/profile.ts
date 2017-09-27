import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuelCostProvider } from '../../providers/fuel-cost/fuel-cost'

@IonicPage({
  name: 'ProfilePage',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fuelCostProvider: FuelCostProvider
  ) {

  }

  getFuelCost() {
    console.log(this.fuelCostProvider.calculateFuelCost(500, 1000));
  }

}
