import { Profile } from './profile';

export interface User{
    userId: string;
    profile:Profile;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phone: string;
}
