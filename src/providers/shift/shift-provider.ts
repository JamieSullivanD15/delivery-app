import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shift } from '../../models/shift-model';

@Injectable()
export class ShiftProvider {

  private shifts: Array<Shift>;
  currentShift = {} as Shift;
  activeShift: boolean = false;

  constructor(
    public http: Http
  ) {

  }

  getCurrentShift() {
    return this.currentShift;
  }

}
