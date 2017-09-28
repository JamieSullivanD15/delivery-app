import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuelCostProvider } from '../../providers/fuel-cost/fuel-cost-provider';
import { CompaniesProvider } from '../../providers/companies/companies-provider';
import { Company } from '../../models/company-model';

@IonicPage({
  name: 'ProfilePage',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  company = {} as Company;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fuelCostProvider: FuelCostProvider,
    private companiesProvider: CompaniesProvider
  ) {

  }

  addCompany() {
    this.companiesProvider.addCompany(this.company);
    this.company = {} as Company;
  }

  getCompanies() {
    this.companiesProvider.getCompanies()
  }


}
