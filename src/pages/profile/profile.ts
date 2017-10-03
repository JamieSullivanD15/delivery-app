import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FuelCostProvider } from '../../providers/fuel-cost/fuel-cost-provider';
import { CompaniesProvider } from '../../providers/companies/companies-provider';

import { VehicleExpense } from '../../models/vehicle-expense-model';
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

  userName = 'Jamie';
  company = {} as Company;
  companies = Array<Company>();
  vehicleExpenses = Array<VehicleExpense>();

  companyDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropdown'
  };

  vehicleExpenseDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropdown'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fuelCostProvider: FuelCostProvider,
    private companiesProvider: CompaniesProvider
  ) {
    this.companies = this.companiesProvider.getCompanies();
  }

  addCompany() {
    this.companiesProvider.addCompany(this.company);
    this.company = {} as Company;
  }

  dropMenu(type: any) {
    if (type === 'company') this.companyDropdown.isActive = !this.companyDropdown.isActive;
    if (type === 'vehicleExpense') this.vehicleExpenseDropdown.isActive = !this.vehicleExpenseDropdown.isActive;

    this.companyDropdown.isActive ? this.companyDropdown.arrow = 'arrow-dropup' : this.companyDropdown.arrow = 'arrow-dropdown';
    this.vehicleExpenseDropdown.isActive ? this.vehicleExpenseDropdown.arrow = 'arrow-dropup' : this.vehicleExpenseDropdown.arrow = 'arrow-dropdown';
  }

}
