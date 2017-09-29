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
  buttonText = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transactionProvider: TransactionProvider
  ) {
    // If a transaction has been passed in then we update the fields associated
    // with the transaction selected and change the button text to display update
    if (this.navParams.get('transaction')) {
      this.buttonText = 'Update';
      this.transaction = this.navParams.get('transaction');
    } else {
      this.buttonText = 'Add Transaction'
    }
  }

  addTransaction() {
    this.transaction.amount = Number(this.transaction.amount);
    if (this.navParams.get('transaction')) {
      this.editTransaction()
      return;
    }
    this.transactionProvider.addTransaction(this.transaction);
    this.navCtrl.setRoot('ShiftPage');
  }

  editTransaction() {
    // Pass the index of current transaction as well as the updated version
    this.transactionProvider.editTransaction(this.navParams.get('index'), this.transaction);
    this.navCtrl.setRoot('ShiftPage');
  }

  cancel() {
    this.navCtrl.setRoot('ShiftPage');
  }


}
