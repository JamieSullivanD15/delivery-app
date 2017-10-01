import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShiftDetailsPage } from './shift-details';

@NgModule({
  declarations: [
    ShiftDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShiftDetailsPage),
  ],
})
export class ShiftDetailsPageModule {}
