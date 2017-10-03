import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FuelCostProvider {

  vechicleMpg = 45;
  pricePerLitre = 1.29;

  constructor(
    public http: Http
  ) {

  }

  getMpg() {
    return this.vechicleMpg;
  }

  getPricePerLitre() {
    return this.pricePerLitre;
  }

  calculateFuelCost(totalMileage: number) {
    this.vechicleMpg = Number(this.vechicleMpg);
    this.pricePerLitre = Number(this.pricePerLitre);

    // 1 Imperial Gallon is 4.54609 Litre's
    // Mileage Fuel Cost = Distance / MPG * Price Per Gallon
    let pricePerGallon = this.pricePerLitre * 4.54609;
    return totalMileage / this.vechicleMpg * pricePerGallon;
  }

}
