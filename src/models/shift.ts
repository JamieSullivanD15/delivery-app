import { Delivery } from './delivery';
import { Company } from './company';
import { ExtraTransaction } from './extra-transaction';

export interface Shift {
  date: Date;
  deliveries: Array<Delivery>;
  extraTransactions: Array<ExtraTransaction>;
  company: Company;
  startMileage: number;
  endMileage: number;
  mileageFuelCost: number;
  grossPay: number;
  totalEarned: number;
}
