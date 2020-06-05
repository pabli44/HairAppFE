import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { Profile } from '../models/profile';


@Injectable()
export class ProfileService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveProfile(body: any) {
        return this.http.post(this.url + servicesNames.profiles, body, this.headers);
    }

    updateProfile(id: any,body: any) {
        return this.http.put(this.url + servicesNames.profiles + "/" +id, body, this.headers);
    }

    deleteProfile(id: any){
        return this.http.delete(this.url + servicesNames.profiles + "/" +id, this.headers)
    }

    getProfiles() {
        return this.http.get<Profile[]>(this.url + servicesNames.profiles);
    }
    
}