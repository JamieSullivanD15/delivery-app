import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies-provider';
import { Shift } from '../../models/shift';
import { Delivery } from '../../models/delivery';
import { Company } from '../../models/company';
import { ExtraTransaction } from '../../models/extra-transaction';

@IonicPage({
  name: 'ShiftPage',
  segment: 'shift'
})
@Component({
  selector: 'page-shift',
  templateUrl: 'shift.html',
})
export class ShiftPage {

  companies: Array<Company>;
  selectedCompany: Company;
  shift = {} as Shift;
  activeShift: boolean = false;

  transactions: Array<ExtraTransaction>;

  deliveries: Array<Delivery> = [
    {tipAmount: 5, paymentType:'Paid'},
    {tipAmount: 7, paymentType:'Not-Paid'}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private companiesProvider: CompaniesProvider
  ) {
    this.companies = companiesProvider.getCompanies();
  }

  startShift() {
    this.activeShift = true;
    this.shift.company = this.selectedCompany;
    this.shift.company.wage = Number(this.shift.company.wage);
    this.shift.company.deliveryCharge = Number(this.shift.company.deliveryCharge);
    this.shift.startMileage = Number(this.shift.startMileage);
  }

  finishShift() {

  }

}
