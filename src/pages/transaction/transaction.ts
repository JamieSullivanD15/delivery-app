import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaction } from '../../models/transaction-model';
import { TransactionProvider } from '../../providers/transaction/transaction-provider';

@IonicPage({
  name: 'TransactionPage',
  segment: 'transaction'
})
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {

  transaction = {} as Transaction;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transactionProvider: TransactionProvider
  ) {

  }

  addTransaction() {
    this.transaction.amount = Number(this.transaction.amount);
    this.transactionProvider.addTransaction(this.transaction);
    this.navCtrl.setRoot('ShiftPage');
  }

  editTransaction() {

  }

  deleteTransaction() {

  }

  cancel() {

  }


}
