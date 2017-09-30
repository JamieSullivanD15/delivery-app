import { Delivery } from './delivery-model';
import { Company } from './company-model';
import { Transaction } from './transaction-model';

export interface Shift {
  date: any;
  company: Company;

  deliveries: Array<Delivery>;
  transactions: Array<Transaction>;

  startMileage: number;
  endMileage: number;
  totalMileage: number;
  mileageFuelCost: any;

  hoursWorked: number;
  grossPay: number;
  totalEarned: number;
}
