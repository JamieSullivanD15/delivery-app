import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { FuelCostProvider } from '../../providers/fuel-cost/fuel-cost-provider';
import { CompaniesProvider } from '../../providers/companies/companies-provider';

import { Company } from '../../models/company-model';

@IonicPage({
  name: 'ProfilePage',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userName = 'Jamie';
  company = {} as Company;
  companies = Array<Company>();

  companyDropdown: any = {
    isActive: false,
    arrow: 'arrow-dropdown'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fuelCostProvider: FuelCostProvider,
    private companiesProvider: CompaniesProvider,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.companies = this.companiesProvider.getCompanies();
  }

  dropMenu(type: any) {
    if (type === 'company') this.companyDropdown.isActive = !this.companyDropdown.isActive;
    this.companyDropdown.isActive ? this.companyDropdown.arrow = 'arrow-dropup' : this.companyDropdown.arrow = 'arrow-dropdown';
  }

  addCompany() {
    const alert = this.alertCtrl.create({
      title: 'Add Company',
      inputs: [
        {
          placeholder: 'Company Name',
          type: 'text'
        },
        {
          placeholder: 'Wage Per Hour',
          type: 'number'
        },
        {
          placeholder: 'Delivery Charge',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.companiesProvider.addCompany(data)
          }
        }
      ]
    });
    alert.present();
  }

  editUsername() {
    const alert = this.alertCtrl.create({
      title: 'Edit Username',
      inputs: [
        {
          value: this.userName,
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: data => {
            this.userName = data[0]
          }
        }
      ]
    });
    alert.present();
  }

  editCompany(i: number) {
    const alert = this.alertCtrl.create({
      title: 'Edit Company',
      inputs: [
        {
          value: this.companies[i].name,
          type: 'text'
        },
        {
          value: this.companies[i].wage.toString(),
          type: 'number'
        },
        {
          value: this.companies[i].deliveryCharge.toString(),
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: data => {
            this.companiesProvider.editCompany(data, i)
          }
        }
      ]
    });
    alert.present();
  }

  presentActionSheet(i: number) {
    const actionSheet = this.actionSheetCtrl.create(
      {
       buttons: [
         {
           text: 'Delete',
           role: 'destructive',
           handler: () => {
             this.companiesProvider.deleteCompany(i)
           }
         },
         {
           text: 'Edit',
           handler: () => {
             this.editCompany(i)
           }
         },
         {
           text: 'Cancel',
           role: 'cancel'
         }
       ]
      }
    );
    actionSheet.present();
  }

}
