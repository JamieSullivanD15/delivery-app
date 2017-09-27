import { Delivery } from './delivery';
import { ExtraTransaction } from './extra-transaction';

export interface Shift {
  deliveries: Array<Delivery>;
  extraTransactions: Array<ExtraTransaction>;
  mileageFuelCost: number;
  grossPay: number;
  totalEarned: number;
}
