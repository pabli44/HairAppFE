import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment, servicesNames } from '../../environments/environment';
import { Adress } from '../models/adress';

@Injectable({
    providedIn: 'root'
})
export class AdressService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveAdress(adress: Adress) {
        return this.http.post(this.url + servicesNames.adresses, adress, this.headers).subscribe();
    }

     // HttpClient API post() method => Create employee
    // saveAdress(adress: Adress): Observable<Adress> {
    //     return this.http.post<Adress>(this.url + servicesNames.adresses, JSON.stringify(adress), this.headers)
    //     .pipe(
    //     retry(1),
    //     catchError(this.handleError)
    //     )
    // }  



    updateAdress(id: any,adress: Adress) {
        return this.http.put(this.url + servicesNames.adresses + "/" +id, adress, this.headers);
    }

    deleteAdress(id: any){
        return this.http.delete(this.url + servicesNames.adresses + "/" +id, this.headers)
    }

    getAdress(id: number): Observable<Adress>{
        return this.http.get<Adress>(this.url + servicesNames.adresses + "/" +id, this.headers);
    }

    getAdressByUser(user: number): Observable<Adress[]>{
        return this.http.get<Adress[]>(this.url + servicesNames.adresses + "?userParam=" +user, this.headers);
    }

    getAdresses() {
        return this.http.get<Adress[]>(this.url + servicesNames.adresses);
    }


     // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
    
}