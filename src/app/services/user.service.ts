import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from '../models/user.model';


@Injectable()
export class UserService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveUser(body: any) {
        return this.http.post(this.url + 'users', body, this.headers);
    }

    updateUser(id: any,body: any) {
        return this.http.put(this.url + 'users/'+id, body, this.headers);
    }

    deleteUser(id: any){
        return this.http.delete(this.url + 'users/'+id, this.headers)
    }

    getUsers() {
        return this.http.get<User[]>(this.url + 'users');
    }
    
}