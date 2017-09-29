import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies/companies-provider';
import { Shift } from '../../models/shift-model';
import { Delivery } from '../../models/delivery-model';
import { Company } from '../../models/company-model';
import { Transaction } from '../../models/transaction-model';
import { TransactionProvider } from '../../providers/transaction/transaction-provider';
import { DeliveryProvider } from '../../providers/delivery/delivery-provider';
import { ShiftProvider } from '../../providers/shift/shift-provider';

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

  transactions: Array<Transaction>;

  deliveries: Array<Delivery>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private companiesProvider: CompaniesProvider,
    private transactionProvider: TransactionProvider,
    private deliveryProvider: DeliveryProvider,
    private shiftProvider: ShiftProvider
  ) {
    this.companies = companiesProvider.getCompanies();
    this.transactions = this.transactionProvider.getTransactions();
    this.deliveries = this.deliveryProvider.getDeliveries();
    this.activeShift = this.shiftProvider.activeShift;
  }

  startShift() {
    this.activeShift = true;
    this.shiftProvider.activeShift = true;
    this.shift.company = this.selectedCompany;
    this.shift.company.wage = Number(this.shift.company.wage);
    this.shift.company.deliveryCharge = Number(this.shift.company.deliveryCharge);
    this.shift.startMileage = Number(this.shift.startMileage);
    this.shiftProvider.setCurrentShift(this.shift);
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
