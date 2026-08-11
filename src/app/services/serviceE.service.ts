import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, servicesNames } from '../../environments/environment';
import { ServiceE } from '../models/serviceE';


@Injectable({
    providedIn: 'root'
})
export class ServiceEService{
    url:string = environment.url;
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) {

    }

    saveServiceE(service: ServiceE) {
        return this.http.post(this.url + servicesNames.services, service, this.headers);
    }

    updateServiceE(id: any,service: ServiceE) {
        return this.http.put(this.url + servicesNames.services + "/" +id, service, this.headers);
    }

    deleteServiceE(id: any){
        return this.http.delete(this.url + servicesNames.services + "/" +id, this.headers)
    }

    getServiceE(id: number): Observable<ServiceE>{
        return this.http.get<ServiceE>(this.url + servicesNames.services + "/" +id, this.headers);
    }

    getServiceEByTypeService(typeService: number): Observable<ServiceE>{
        return this.http.get<ServiceE>(this.url + servicesNames.services + "?typeServiceParam=" +typeService, this.headers);
    }

    getServicesE() {
        return this.http.get<ServiceE[]>(this.url + servicesNames.services);
    }
    
}