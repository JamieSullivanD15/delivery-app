import { Delivery } from './delivery-model';
import { Company } from './company-model';
import { Transaction } from './transaction-model';

export interface Shift {
  date: Date;
  deliveries: Array<Delivery>;
  transactions: Array<Transaction>;
  company: Company;
  startMileage: number;
  endMileage: number;
  mileageFuelCost: number;
  grossPay: number;
  totalEarned: number;
}
