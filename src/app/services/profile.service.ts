import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { Profile } from '../models/profile';


@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveProfile(profile: Profile) {
        return this.http.post(this.url + servicesNames.profiles, profile, this.headers).subscribe();
    }

    updateProfile(id: any,profile: Profile) {
        return this.http.put(this.url + servicesNames.profiles + "/" +id, profile, this.headers);
    }

    deleteProfile(id: any){
        return this.http.delete(this.url + servicesNames.profiles + "/" +id, this.headers)
    }

    getProfile(id: number): Observable<Profile>{
        return this.http.get<Profile>(this.url + servicesNames.profiles + "/" +id, this.headers);
    }

    getProfileByProfile(profile: string): Observable<Profile>{
        return this.http.get<Profile>(this.url + servicesNames.profiles + "?profileNameParam=" +profile, this.headers);
    }

    getProfiles() {
        return this.http.get<Profile[]>(this.url + servicesNames.profiles);
    }
    
}