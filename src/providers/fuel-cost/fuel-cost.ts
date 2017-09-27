import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FuelCostProvider {

  private vechicleMpg: number;
  private pricePerLitre: number;

  constructor(
    public http: Http
  ) {

  }

  setMpg(vechicleMpg: number) {
    this.vechicleMpg = vechicleMpg;
  }

  getMpg() {
    return this.vechicleMpg;
  }

  setPricePerLitre(pricePerLitre: number) {
    this.pricePerLitre = pricePerLitre;
  }

  getPricePerLitre() {
    return this.pricePerLitre;
  }

  calculateFuelCost(startMileage: number, endMileage: number) {
    // 1 Imperial Gallon is 4.54609 Litre's
    // Distance / MPG * Price Per Gallon
    let totalMileage = endMileage - startMileage;
    let pricePerGallon = this.pricePerLitre * 4.54609;
    return totalMileage / this.vechicleMpg * pricePerGallon;
  }

}
