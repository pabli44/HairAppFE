import { User } from './user';
import { Transaction } from './transaction';
import { ServiceE } from './serviceE';

export interface ServiceDetail {
   id?: string;
   service?: ServiceE;
   user?: User;
   value?: string;
   date?: string;
   hour?: string;
   professional?: User;
   transaction?: Transaction;
}
