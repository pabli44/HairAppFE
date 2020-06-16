import { Profile } from './profile';
import { Deserializable } from './deserializable.model';

export interface User{
    userId: string;
    profile:Profile;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phone: string;

    // deserialize(input: any): User{
    //     Object.assign(this, input);
    //     this.profile = new Profile().deserialize(input.profile);
    //     return this;
    // }

    // deserialize(input: any): this{
    //     Object.assign(this, input);
    //     return this;
    // }

}
