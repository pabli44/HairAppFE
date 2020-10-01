import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceDetailService } from 'src/app/services/service-detail.service';
import { ServiceDetail } from 'src/app/models/service-detail';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.less']
})
export class ProfessionalComponent implements OnInit {
  name:string = "";
  userId: string;
  serviceDetailsProfessional:ServiceDetail[];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private serviceDetailService:ServiceDetailService) { }

  ngOnInit() {
    if(localStorage.getItem("UserSession")){
      this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.name = params['name'];
        });

        this.userId = localStorage.getItem("UserSession"); 
        this.serviceDetailService.getServiceDetailByProfessional(Number(this.userId)).subscribe(ds => {
          this.serviceDetailsProfessional = ds;
          console.log(this.serviceDetailsProfessional);
        });



    }else{
      this.router.navigate(['/login']);
    }
  }

}
