import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies-provider';
import { Shift } from '../../models/shift-model';
import { Delivery } from '../../models/delivery-model';
import { Company } from '../../models/company-model';
import { Transaction } from '../../models/transaction-model';

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

  transactions: Array<Transaction> = [
    {type: 'Expense', amount: 6, notes: 'Bought lunch'},
    {type: 'Bonus', amount: 1.75, notes: 'Went to Dunboyne'}
  ];

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

  addDelivery() {
    this.navCtrl.push('DeliveryPage');
  }

  addTransaction() {
    this.navCtrl.push('TransactionPage');
  }

  editDelivery() {

  }

  editTransaction() {

  }

  deleteDelivery() {

  }

  deleteTransaction() {

  }

  calculateEarnings() {

  }

}
