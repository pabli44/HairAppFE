//Manage sign and login components

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveUser(user: User){
        this.http.post(this.url + servicesNames.users, user, this.headers).subscribe(user =>{
            console.log(user);
        });
    }
    
    updateUser(id: number,user: User) {
        return this.http.put(this.url + servicesNames.users + "/" +id, user, this.headers);
    }

    deleteUser(id: number){
        return this.http.delete(this.url + servicesNames.users + "/" +id, this.headers);
    }

    getUser(id: number): Observable<User>{
        return this.http.get<User>(this.url + servicesNames.users + "/" +id, this.headers);
    }

    getUserByEmail(email: string): Observable<User>{
        return this.http.get<User>(this.url + servicesNames.users + "?emailParam=" +email, this.headers);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url + servicesNames.users);
    }
    
}