import { User } from './user';
import { ServiceE } from './serviceE';
import { Adress } from './adress';

export interface ServiceDetail {
   serviceDetailsId?: string;
   service?: ServiceE;
   client?: User;
   value?: string;
   date?: string;
   hour?: string;
   quantity?: string;
   professional?: User;
   adress?: Adress;
   paid?: string;
}
