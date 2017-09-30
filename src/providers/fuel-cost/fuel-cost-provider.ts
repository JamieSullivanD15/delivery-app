import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FuelCostProvider {

  private vechicleMpg = 45;
  private pricePerLitre = 1.29;

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

  calculateFuelCost(totalMileage: number) {
    // 1 Imperial Gallon is 4.54609 Litre's
    // Mileage Fuel Cost = Distance / MPG * Price Per Gallon
    let pricePerGallon = this.pricePerLitre * 4.54609;
    return totalMileage / this.vechicleMpg * pricePerGallon;
  }

}
