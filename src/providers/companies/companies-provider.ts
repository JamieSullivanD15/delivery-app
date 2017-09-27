import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from '../../models/company';


@Injectable()
export class CompaniesProvider {

  companies: Array<Company> = [];

  constructor(
    public http: Http
  ) {

  }

  getCompanies() {
    return this.companies;
  }

  addCompany(company: Company) {
    // this.company.name = name;
    // this.company.wage = wage;
    // this.company.deliveryCharge = deliveryCharge;
    this.companies.push(company);
  }

  editCompany(index) {

  }

  deleteCompany(index) {

  }

}
