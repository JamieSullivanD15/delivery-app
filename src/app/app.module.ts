import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { CompaniesProvider } from '../providers/companies/companies';
import { FuelCostProvider } from '../providers/fuel-cost/fuel-cost';
import { EarningsProvider } from '../providers/earnings/earnings';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(
      MyApp,
        {
          iconMode: 'md',
          mode    : 'md',
          useHash : false,
        }
      )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CompaniesProvider,
    FuelCostProvider,
    EarningsProvider
  ]
})
export class AppModule {}
