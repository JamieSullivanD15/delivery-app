import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Delivery } from '../../models/delivery-model';

@Injectable()
export class DeliveryProvider {

  deliveries = Array<Delivery>();

  constructor(
    public http: Http
  ) {

  }

  addDelivery(delivery: Delivery) {
    this.deliveries.push(delivery);
  }

  editDelivery() {

  }

  deleteDelivery() {

  }

  getDeliveries() {
    return this.deliveries;
  }


}
