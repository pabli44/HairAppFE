import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from '../../environments/environment';
import { TypeService } from '../models/type-service';

@Injectable({
    providedIn: 'root'
})
export class TypeServiceService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveTypeService(typeService: TypeService) {
        return this.http.post(this.url + servicesNames.typeservices, typeService, this.headers).subscribe();
    }

    updateTypeService(id: any,typeService: TypeService) {
        return this.http.put(this.url + servicesNames.typeservices + "/" +id, typeService, this.headers);
    }

    deleteTypeService(id: any){
        return this.http.delete(this.url + servicesNames.typeservices + "/" +id, this.headers)
    }

    getTypeService(id: number): Observable<TypeService>{
        return this.http.get<TypeService>(this.url + servicesNames.typeservices + "/" +id, this.headers);
    }

    getTypeServiceByPrice(price: number): Observable<TypeService>{
        return this.http.get<TypeService>(this.url + servicesNames.typeservices + "?priceParam=" +price, this.headers);
    }

    getTypeservices() {
        return this.http.get<TypeService[]>(this.url + servicesNames.typeservices);
    }
    
}