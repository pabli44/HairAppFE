import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from '../../environments/environment';
import { Transaction } from '../models/transaction';


@Injectable()
export class TransactionService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveTransaction(body: any) {
        return this.http.post(this.url + servicesNames.transactions, body, this.headers);
    }

    updateTransaction(id: any,body: any) {
        return this.http.put(this.url + servicesNames.transactions + "/" +id, body, this.headers);
    }

    deleteTransaction(id: any){
        return this.http.delete(this.url + servicesNames.transactions + "/" +id, this.headers)
    }

    getTransaction() {
        return this.http.get<Transaction[]>(this.url + servicesNames.transactions);
    }
    
}