import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from '../../models/company-model';


@Injectable()
export class CompaniesProvider {

  company = {} as Company
  companies: Array<Company> = [];

  constructor(
    public http: Http
  ) {

  }

  getCompanies() {
    return this.companies;
  }

  addCompany(data: any) {
    // 0 is name, 1 is wage, 2 is delivery charge
    data[1] = Number(data[1]);
    data[2] = Number(data[2]);

    this.company.name = data[0];
    this.company.wage = data[1];
    this.company.deliveryCharge = data[2];

    this.companies.push(this.company);
    this.company = {} as Company;
  }

  editCompany(data: any, i: number) {
    data[1] = Number(data[1]);
    data[2] = Number(data[2]);

    this.companies[i].name = data[0];
    this.companies[i].wage = data[1];
    this.companies[i].deliveryCharge = data[2];
  }

  deleteCompany(i: number) {
    this.companies.splice(i, 1);
  }

}
