import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeService } from '../../../../models/type-service';
import { TypeServiceService } from '../../../../services/type-service.service';
import { ServiceDetailService } from 'src/app/services/service-detail.service';
import { AdressService } from 'src/app/services/adress.service';
import { ServiceEService } from 'src/app/services/serviceE.service';
import { UserService } from 'src/app/services/user.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { User } from 'src/app/models/user';
import { ServiceE } from 'src/app/models/serviceE';
import { ServiceDetail } from 'src/app/models/service-detail';
import { Transaction } from 'src/app/models/transaction';
import { Adress } from 'src/app/models/adress';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.less']
})
export class ServiceComponent {

  typeServices: TypeService[];
  adresses: Adress[];
  price: string;
  showUserAdresses: boolean;
  

  typeServiceToSave: TypeService;
  userToSave: User;
  userId: string;

  serviceForm = new FormGroup({
    adress: new FormControl('',Validators.email),
    time: new FormControl(),
    selectTypeService: new FormControl(),
    date: new FormControl(),
    payment: new FormControl(),
    price: new FormControl(''),
    servicesQuantity: new FormControl()
});

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private typeServiceService:TypeServiceService, private serviceDetailService: ServiceDetailService, 
    private adressService: AdressService, private serviceEService: ServiceEService, private userService: UserService, private transactionService: TransactionService,
    private toastr: ToastrService) { 
    this.typeServiceService.getTypeservices().subscribe(dataTypeServices => {
      this.typeServices = dataTypeServices;
      this.price = dataTypeServices[0].price;
      this.typeServiceToSave = this.typeServices[0];
    });

  }

  ngOnInit(){
    if(!localStorage.getItem("UserSession")){
      this.router.navigate(['/login']);
    }

    this.userId = localStorage.getItem("UserSession");    
    this.adressService.getAdressByUser(Number(this.userId)).subscribe(dataAdresses => {
      if(dataAdresses.length>0){
        this.showUserAdresses = true;
        this.adresses = dataAdresses;
      }
    });
  }

  typeServiceSelected(e){
    //console.log(e.target.value);

    this.typeServices.filter(ts =>{
      if(Number(ts.typeServiceId)-1===e.target.selectedIndex){
        this.price = ts.price;
        this.typeServiceToSave = ts;
      }
    })
  }

  onSubmit = () =>{
    //const userId = localStorage.getItem("UserSession");
    this.userService.getUser(Number(this.userId)).subscribe(u => {
      this.userToSave = u;
    });

    //save direction
    const adressSave: Adress = {
      description: this.serviceForm.get('adress').value,
      principal: 'N',
      user: this.userId,
      city: 'Medellin'
    }

    this.adressService.saveAdress(adressSave);

    //save service
    const service: ServiceE = {
      typeService: this.typeServiceToSave,
      state: 'N'  
    }

    this.serviceEService.saveServiceE(service).subscribe(res => {
      service.serviceId = res["recordId"];
    });
    
    //save transaction
    const transaction: Transaction = {
      typeTransaction: "1",
      state: "1"
    }

    this.transactionService.saveTransaction(transaction).subscribe(res => {
      transaction.transactionId = res["recordId"];
    });


    setTimeout(() => {
      //save serviceDetail
      const serviceDetailSave: ServiceDetail = {
        service: service,
        user: this.userToSave,
        value: this.price,
        date: this.serviceForm.get('date').value,
        hour: this.serviceForm.get('time').value,
        transaction,
        quantity: this.serviceForm.get('servicesQuantity').value
      }

      console.log("user to save: "+serviceDetailSave.user.userId);
      console.log("service to save: "+serviceDetailSave.service.serviceId);
      console.log("transaction to save: "+serviceDetailSave.transaction.transactionId);


      this.serviceDetailService.saveServiceDetail(serviceDetailSave);
      this.toastr.success("This Service Was Saved successfully", 'Messages: ');

    }, 4000);




  }
  
  

}
