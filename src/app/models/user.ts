import { Profile } from './profile';

export interface User {
    id?: string;
    profile?:Profile;
    name?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    phone?: string;
}
