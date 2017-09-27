import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shift } from '../../models/shift'

@Injectable()
export class ShiftProvider {

  shifts: Array<Shift>;

  constructor(public http: Http) {

  }

}
