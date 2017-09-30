import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

import { Shift } from '../../models/shift-model';
import { Delivery } from '../../models/delivery-model';
import { Company } from '../../models/company-model';
import { Transaction } from '../../models/transaction-model';

import { CompaniesProvider } from '../../providers/companies/companies-provider';
import { TransactionProvider } from '../../providers/transaction/transaction-provider';
import { DeliveryProvider } from '../../providers/delivery/delivery-provider';
import { ShiftProvider } from '../../providers/shift/shift-provider';
import { FuelCostProvider } from '../../providers/fuel-cost/fuel-cost-provider';

@IonicPage({
  name: 'ShiftPage',
  segment: 'shift'
})
@Component({
  selector: 'page-shift',
  templateUrl: 'shift.html',
})
export class ShiftPage {

  date = new Date().toJSON().split('T')[0];
  selectedCompany: Company;
  shift = {} as Shift;
  activeShift: boolean = false;
  finishShiftActive: boolean = false;

  companies: Array<Company>;
  transactions: Array<Transaction>;
  deliveries: Array<Delivery>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private companiesProvider: CompaniesProvider,
    private transactionProvider: TransactionProvider,
    private deliveryProvider: DeliveryProvider,
    private shiftProvider: ShiftProvider,
    private fuelCostProvider: FuelCostProvider
  ) {
    this.activeShift = this.shiftProvider.activeShift;
    this.formatDate();
    this.companies = companiesProvider.getCompanies();
    this.transactions = this.transactionProvider.getTransactions();
    this.deliveries = this.deliveryProvider.getDeliveries();
    this.activeShift = this.shiftProvider.activeShift;
    this.shift.totalEarned = 0;
    this.calculateShiftTotal();
  }

  startShift() {
    this.shiftProvider.activeShift = true;
    this.activeShift = this.shiftProvider.activeShift;
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

  endShift() {
    this.activeShift = false;
    this.finishShiftActive = true;
  }

  cancelFinishShift() {
    this.activeShift = true;
    this.finishShiftActive = false;
  }

  finishShift() {
    this.updateCurrentShiftInfo();
    this.shiftProvider.activeShift = false;
    this.finishShiftActive = false;
    this.deliveryProvider.deliveries = Array<Delivery>();
    this.transactionProvider.transactions = Array<Transaction>();
    this.shiftProvider.endCurrentShift();
    this.navCtrl.setRoot('ProfilePage');
  }

  updateCurrentShiftInfo() {
    this.shift.hoursWorked = Number(this.shift.hoursWorked);
    this.shift.endMileage = Number(this.shift.endMileage);
    this.shiftProvider.currentShift.hoursWorked = this.shift.hoursWorked;
    this.shiftProvider.currentShift.endMileage = this.shift.endMileage;
    this.shiftProvider.currentShift.grossPay = this.shift.grossPay;
    this.shiftProvider.currentShift.totalEarned = this.shift.totalEarned;
    this.shiftProvider.currentShift.deliveries = this.deliveryProvider.getDeliveries();
    this.shiftProvider.currentShift.transactions = this.transactionProvider.getTransactions();
    this.shiftProvider.currentShift.totalMileage = this.shiftProvider.currentShift.endMileage - this.shiftProvider.currentShift.startMileage;
    this.shiftProvider.currentShift.mileageFuelCost = this.fuelCostProvider.calculateFuelCost(this.shiftProvider.currentShift.totalMileage);
  }

  formatDate() {
    let splitDate = this.date.split('-');
    this.date = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
    this.shift.date = this.date;
    this.shiftProvider.currentShift.date = this.shift.date;
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

  finishShiftConfirmation() {
    const alert = this.alertCtrl.create({
      title: 'Finish Shift',
      message: 'Please confirm you would like to finish the current shift.',
      buttons: [
        {
          text: 'Finish',
          handler: () => {
            this.finishShift();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
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
           role: 'cancel'
         }
       ]
      }

    );
    actionSheet.present();
  }

}
