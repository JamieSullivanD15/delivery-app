import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transaction } from '../../models/transaction-model';

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
  type: any;
  amount: number;
  notes: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }


}
