//Manage sign and login components

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { User } from '../models/user';
import { stringify } from 'querystring';


@Injectable({
    providedIn: 'root'
})
export class UserService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveUser(user: User) {
        console.log(user);
        return this.http.post(this.url + servicesNames.users, user, this.headers).subscribe(data => {
            console.log("Result: "+ stringify(data));
        });
    }

    updateUser(id: number,user: User) {
        return this.http.put(this.url + servicesNames.users + "/" +id, user, this.headers).subscribe(data =>{
            console.log("Result: "+ stringify(data));
        });
    }

    deleteUser(id: number){
        return this.http.delete(this.url + servicesNames.users + "/" +id, this.headers).subscribe(data => {
            console.log("Result: "+ stringify(data));
        });
    }

    getUsers() {
        return this.http.get<User[]>(this.url + servicesNames.users).subscribe(data =>{
            console.log("Result: "+ stringify(data));
            for(let i in data){
              console.log(data[i]);  
            }
        });
    }
    
}