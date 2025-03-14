import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { ServiceDetailService } from 'src/app/services/service-detail.service';
import { ServiceDetail } from 'src/app/models/service-detail';


@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.less']
})
export class ProfessionalComponent implements OnInit {
  name:string = "";
  userId: string;
  countServicesAvailable: boolean;
  serviceDetailsProfessional:ServiceDetail[];
  serviceDetailsProfessionalAll:ServiceDetail[];

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private serviceDetailService:ServiceDetailService) { }

  ngOnInit() {
    if(localStorage.getItem("UserSession")){
      this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.name = params['name'];
        });

        this.userId = localStorage.getItem("UserSession");

        //services by professional
        this.serviceDetailService.getServiceDetailByProfessional(Number(this.userId)).subscribe(ds => {
          this.serviceDetailsProfessional = ds;
        });

        //available services
        this.serviceDetailService.getServiceDetails().subscribe(ds => {
          this.serviceDetailsProfessionalAll = ds.filter(sd => sd.professional.userId==sd.client.userId);
        });

    }else{
      this.router.navigate(['/login']);
    }
  }

  changeProfessional(serviceDetailObject: ServiceDetail, action: string){
    if(action==="assign"){
      serviceDetailObject.professional.userId = this.userId;
      this.serviceDetailsProfessionalAll = this.serviceDetailsProfessionalAll.filter(sd => sd.serviceDetailsId!=serviceDetailObject.serviceDetailsId);
      this.serviceDetailsProfessional.push(serviceDetailObject);
    }else{
      serviceDetailObject.professional.userId = serviceDetailObject.client.userId;
      this.serviceDetailsProfessional = this.serviceDetailsProfessional.filter(sd => sd.serviceDetailsId!=serviceDetailObject.serviceDetailsId);
      this.serviceDetailsProfessionalAll.push(serviceDetailObject);
    }

    this.serviceDetailService.updateServiceDetail(serviceDetailObject.serviceDetailsId, serviceDetailObject).subscribe();
  }



}
