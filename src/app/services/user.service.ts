import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { User } from '../models/user';


@Injectable()
export class UserService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveUser(body: any) {
        return this.http.post(this.url + servicesNames.users, body, this.headers);
    }

    updateUser(id: any,body: any) {
        return this.http.put(this.url + servicesNames.users + "/" +id, body, this.headers);
    }

    deleteUser(id: any){
        return this.http.delete(this.url + servicesNames.users + "/" +id, this.headers)
    }

    getUsers() {
        return this.http.get<User[]>(this.url + servicesNames.users);
    }
    
}