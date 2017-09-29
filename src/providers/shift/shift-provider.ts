import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shift } from '../../models/shift-model';

@Injectable()
export class ShiftProvider {

  private shifts: Array<Shift>;
  private currentShift = {} as Shift;
  activeShift: boolean = false;

  constructor(
    public http: Http
  ) {

  }

  setCurrentShift(shift : Shift) {
    this.currentShift = shift;
  }

  getCurrentShift() {
    return this.currentShift;
  }

}
