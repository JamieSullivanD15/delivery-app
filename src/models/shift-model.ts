import { Delivery } from './delivery-model';
import { Company } from './company-model';
import { Transaction } from './transaction-model';

export interface Shift {
  date: any;
  company: Company;

  deliveries: Array<Delivery>;
  transactions: Array<Transaction>;

  startMileage: any;
  endMileage: any;
  totalMileage: any;
  mileageFuelCost: any;

  hoursWorked: any;
  grossPay: any;
  totalEarned: any;
}
