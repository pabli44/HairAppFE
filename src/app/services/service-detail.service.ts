import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from './../../environments/environment';
import { ServiceDetail } from '../models/service-detail';


@Injectable({
    providedIn: 'root'
})
export class ServiceDetailService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveServiceDetail(serviceDetail: ServiceDetail) {
        return this.http.post(this.url + servicesNames.servicedetails, serviceDetail, this.headers).subscribe();
    }

    updateServiceDetail(id: any,serviceDetail: ServiceDetail) {
        return this.http.put(this.url + servicesNames.servicedetails + "/" +id, serviceDetail, this.headers);
    }

    deleteServiceDetail(id: any){
        return this.http.delete(this.url + servicesNames.servicedetails + "/" +id, this.headers)
    }

    getServiceDetail(id: number): Observable<ServiceDetail>{
        return this.http.get<ServiceDetail>(this.url + servicesNames.servicedetails + "/" +id, this.headers);
    }

    getServiceDetailByService(service: number): Observable<ServiceDetail>{
        return this.http.get<ServiceDetail>(this.url + servicesNames.servicedetails + "?serviceParam=" +service, this.headers);
    }

    getServiceDetails() {
        return this.http.get<ServiceDetail[]>(this.url + servicesNames.servicedetails);
    }
    
}