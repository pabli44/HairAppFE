import { User } from './user';
import { Transaction } from './transaction';
import { ServiceE } from './serviceE';

export interface ServiceDetail {
   serviceDetailsId?: string;
   service?: ServiceE;
   client?: User;
   value?: string;
   date?: string;
   hour?: string;
   transaction?: Transaction;
   quantity?: string;
   professional?: User;
}
