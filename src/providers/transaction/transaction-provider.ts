import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Transaction } from '../../models/transaction-model';

@Injectable()
export class TransactionProvider {

  transactions = Array<Transaction>();

  constructor(
    public http: Http
  ) {

  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  editTransaction() {

  }

  deleteTransaction() {

  }

  getTransactions() {
    return this.transactions;
  }

}
