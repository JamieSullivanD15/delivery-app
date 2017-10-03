import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { VehicleExpense } from '../../models/vehicle-expense-model';

@Injectable()
export class VehicleExpensesProvider {

  private vehicleExpenses = Array<VehicleExpense>();

  constructor(
    public http: Http
  ) {

  }

  getVehicleExpenses() {
    return this.vehicleExpenses;
  }

  addVehicleExpense(expense: any) {
    this.vehicleExpenses.push(expense);
  }

}
