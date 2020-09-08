import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from '../../environments/environment';
import { Transaction } from '../models/transaction';


@Injectable({
    providedIn: 'root'
})
export class TransactionService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveTransaction(transaction: Transaction) {
        return this.http.post(this.url + servicesNames.transactions, transaction, this.headers);
    }

    updateTransaction(id: any,transaction: Transaction) {
        return this.http.put(this.url + servicesNames.transactions + "/" +id, transaction, this.headers);
    }

    deleteTransaction(id: any){
        return this.http.delete(this.url + servicesNames.transactions + "/" +id, this.headers)
    }

    getTransaction(id: number): Observable<Transaction>{
        return this.http.get<Transaction>(this.url + servicesNames.transactions + "/" +id, this.headers);
    }

    getTransactionByType(type: number): Observable<Transaction>{
        return this.http.get<Transaction>(this.url + servicesNames.transactions + "?typeTransactionParam=" +type, this.headers);
    }

    getTransactions() {
        return this.http.get<Transaction[]>(this.url + servicesNames.transactions);
    }
    
}