import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDetailService } from 'src/app/services/service-detail.service';
import { ServiceDetail } from 'src/app/models/service-detail';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  userId: string;
  serviceDetails: ServiceDetail[];
  cardClassFront: string;
  cardClassBack: string;
  cardClassFrontPaid: string;
  cardClassBackPaid: string;

  constructor(private router:Router, private serviceDetailService:ServiceDetailService) { }

  ngOnInit(){
    if(!localStorage.getItem("UserSession")){
      this.router.navigate(['/login']);
    }

    this.userId = localStorage.getItem("UserSession");    
    this.cardClassFront = "flip-card-front";
    this.cardClassBack = "flip-card-back";
    this.cardClassFrontPaid = "flip-card-front-paid";
    this.cardClassBackPaid = "flip-card-back-paid";
    
    this.serviceDetailService.getServiceDetailByClient(Number(this.userId)).subscribe(data => {
      data.forEach(d => {
        d.date = d.date.substring(0,10);
      });
      this.serviceDetails = data;
    });
   
  }

}
