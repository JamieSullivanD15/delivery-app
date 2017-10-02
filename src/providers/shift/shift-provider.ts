import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shift } from '../../models/shift-model';

@Injectable()
export class ShiftProvider {

  private shifts = Array<Shift>();
  currentShift = {} as Shift;
  activeShift: boolean = false;

  constructor(
    public http: Http
  ) {

  }

  getShifts() {
    return this.shifts;
  }

  getCurrentShift() {
    return this.currentShift;
  }

  endCurrentShift() {
    this.calculateShiftEarnings();
    this.shifts.push(this.currentShift);
    this.currentShift = {} as Shift;
  }

  calculateShiftEarnings() {
    let wageEarned = this.currentShift.company.wage * this.currentShift.hoursWorked;
    this.currentShift.grossPay += wageEarned;
    this.currentShift.totalEarned = this.currentShift.grossPay - this.currentShift.mileageFuelCost;
    //this.currentShift.mileageFuelCost = this.currentShift.mileageFuelCost.toFixed(2);
  }

  delete(i: number) {
    this.shifts.splice(i, 1);
  }

}
