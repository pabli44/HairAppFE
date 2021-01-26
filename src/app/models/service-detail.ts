import { User } from './user';
import { Transaction } from './transaction';
import { ServiceE } from './serviceE';
import { Adress } from './adress';

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
   adress?: Adress
}
