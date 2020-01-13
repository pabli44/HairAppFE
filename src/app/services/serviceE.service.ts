import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from '../../environments/environment';
import { ServiceE } from '../models/serviceE';


@Injectable()
export class ServiceEService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveServiceE(body: any) {
        return this.http.post(this.url + servicesNames.services, body, this.headers);
    }

    updateServiceE(id: any,body: any) {
        return this.http.put(this.url + servicesNames.services + "/" +id, body, this.headers);
    }

    deleteServiceE(id: any){
        return this.http.delete(this.url + servicesNames.services + "/" +id, this.headers)
    }

    getServiceE() {
        return this.http.get<ServiceE[]>(this.url + servicesNames.services);
    }
    
}