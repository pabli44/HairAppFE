import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { ServiceDetail } from '../models/service-detail';


@Injectable()
export class ServiceDetailService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveServiceDetail(body: any) {
        return this.http.post(this.url + servicesNames.serviceDetails, body, this.headers);
    }

    updateServiceDetail(id: any,body: any) {
        return this.http.put(this.url + servicesNames.serviceDetails + "/" +id, body, this.headers);
    }

    deleteServiceDetail(id: any){
        return this.http.delete(this.url + servicesNames.serviceDetails + "/" +id, this.headers)
    }

    getServiceDetails() {
        return this.http.get<ServiceDetail[]>(this.url + servicesNames.serviceDetails);
    }
    
}