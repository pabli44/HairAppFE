import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceDetailService } from 'src/app/services/service-detail.service';
import { ServiceDetail } from 'src/app/models/service-detail';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.less']
})
export class ProfessionalComponent implements OnInit {
  userId: string;
  serviceDetailsProfessional: ServiceDetail[] = [];
  serviceDetailsProfessionalAll: ServiceDetail[] = [];

  constructor(private router: Router, private serviceDetailService: ServiceDetailService) { }

  ngOnInit() {
    if(localStorage.getItem("UserSession")){
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
