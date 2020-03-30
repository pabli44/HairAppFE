import { Deserializable } from './deserializable.model';

export interface Profile{
    profileId: string;
    profileName: string;

    // deserialize(input: any): this{
    //     Object.assign(this, input);
    //     return this;
    // }

}
