import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Shift } from '../../models/shift-model';
import { Delivery } from '../../models/delivery-model';
import { Company } from '../../models/company-model';
import { Transaction } from '../../models/transaction-model';

import { CompaniesProvider } from '../../providers/companies/companies-provider';
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
    public actionSheetCtrl: ActionSheetController,
    private companiesProvider: CompaniesProvider,
    private transactionProvider: TransactionProvider,
    private deliveryProvider: DeliveryProvider,
    private shiftProvider: ShiftProvider
  ) {
    this.companies = companiesProvider.getCompanies();
    this.transactions = this.transactionProvider.getTransactions();
    this.deliveries = this.deliveryProvider.getDeliveries();
    this.activeShift = this.shiftProvider.activeShift;
    this.shift.totalEarned = 0;
    this.calculateShiftTotal();
  }

  startShift() {
    this.activeShift = true;
    this.shiftProvider.activeShift = true;
    this.shift.company = this.selectedCompany;
    this.shift.company.wage = Number(this.shift.company.wage);
    this.shift.company.deliveryCharge = Number(this.shift.company.deliveryCharge);
    this.shift.startMileage = Number(this.shift.startMileage);
    this.shiftProvider.currentShift = this.shift;
  }

  calculateShiftTotal() {
    let totalExpenses = 0;
    this.shift.totalEarned = 0;
    this.shift.grossPay = 0;

    for (let i = 0; i < this.deliveries.length; ++i) {
      this.shift.grossPay += this.deliveries[i].total;
    }

    for (let i = 0; i < this.transactions.length; ++i) {
      if (this.transactions[i].type.toLowerCase() === 'bonus') this.shift.grossPay += this.transactions[i].amount
      else if (this.transactions[i].type.toLowerCase() === 'expense') totalExpenses = this.transactions[i].amount;
    }

    this.shift.totalEarned = this.shift.grossPay - totalExpenses;
  }

  finishShift() {
    this.shiftProvider.currentShift.deliveries = this.deliveryProvider.getDeliveries();
    this.shiftProvider.currentShift.transactions = this.transactionProvider.getTransactions();
    this.shiftProvider.currentShift.grossPay = this.shift.grossPay;
    this.shiftProvider.currentShift.totalEarned = this.shift.totalEarned;
    // console.log(this.shiftProvider.currentShift);
  }

  add(type: any) {
    if (type.toLowerCase() === 'delivery') this.navCtrl.push('DeliveryPage')
    else if (type.toLowerCase() === 'transaction') this.navCtrl.push('TransactionPage');
  }

  edit(i: number, type: any) {
    if (type.toLowerCase() === 'delivery') {
      this.navCtrl.push('DeliveryPage', {
        delivery: this.deliveries[i],
        paymentType: this.deliveries[i].paymentType,
        index: i
      });
      this.deliveries = this.deliveryProvider.getDeliveries();
    } else if (type.toLowerCase() === 'transaction') {
      this.navCtrl.push('TransactionPage', {
        transaction: this.transactions[i],
        index: i
      });
      this.transactions = this.transactionProvider.getTransactions();
    }
  }

  delete(i: number, type: any) {
    if (type.toLowerCase() === 'delivery') {
      this.deliveryProvider.deleteDelivery(i);
      this.deliveries = this.deliveryProvider.getDeliveries();
    } else if (type.toLowerCase() === 'transaction') {
      this.transactionProvider.deleteTransaction(i);
      this.transactions = this.transactionProvider.getTransactions();
    }

    this.calculateShiftTotal();
  }

  presentActionSheet(i: number, type: any) {
    const actionSheet = this.actionSheetCtrl.create(

      {
       buttons: [
         {
           text: 'Delete',
           role: 'destructive',
           handler: () => {
             this.delete(i, type);
           }
         },
         {
           text: 'Edit',
           handler: () => {
             this.edit(i, type);
           }
         },
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {

           }
         }
       ]
      }

    );
    actionSheet.present();
  }

}
