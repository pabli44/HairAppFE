import { Component} from '@angular/core';
import { Router } from '@angular/router';
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
  adressIdFind: string;
  price: string;
  totalPrice: string;

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
    servicesQuantity: new FormControl('0', Validators.maxLength(1)),
    totalPrice: new FormControl('')
});

  constructor(private router:Router, private typeServiceService:TypeServiceService, private serviceDetailService: ServiceDetailService,
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
        this.adresses = dataAdresses;
        this.adressIdFind = this.adresses[0].adressId;
      }
    });

    this.totalPrice = "0";

  }

  updateTotalPrice(e){
    const total = Number(this.price) * Number(this.serviceForm.get('servicesQuantity').value);
    this.totalPrice = total.toString();
  }

  typeServiceSelected(e){
    this.typeServices.filter(ts =>{
      if(Number(ts.typeServiceId)-1===e.target.selectedIndex){
        this.price = ts.price;
        this.typeServiceToSave = ts;
      }
    })
  }

  getAdress(e){
    this.adressIdFind = e.target.value.substr(0,2);
  }

  onSubmit = () =>{
    if(this.serviceForm.get('servicesQuantity').value=="0" || Number(this.serviceForm.get('servicesQuantity').value)>3){
      this.toastr.warning("The minimun Service Quantity field must be between 1 and 3, please check...", 'Messages: ');
      return;
    }

    this.userService.getUser(Number(this.userId)).subscribe(u => {
      this.userToSave = u;
    });


    //save direction
    const adressToSave = this.adresses.find(ad => ad.adressId==this.adressIdFind);


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
        client: this.userToSave,
        value: this.totalPrice,
        date: this.serviceForm.get('date').value,
        hour: this.serviceForm.get('time').value,
        transaction,
        quantity: this.serviceForm.get('servicesQuantity').value,
        professional: this.userToSave, //se guarda con el id del cliente mientras el profesional se asigna este servicio en las card, y se actualiza al id del profesional
        adress: adressToSave
      }

      console.log("client to save: "+serviceDetailSave.client.userId);
      console.log("service to save: "+serviceDetailSave.service.serviceId);
      console.log("transaction to save: "+serviceDetailSave.transaction.transactionId);


      this.serviceDetailService.saveServiceDetail(serviceDetailSave);
      this.toastr.success("This Service Was Saved successfully", 'Messages: ');

      this.router.navigate(['/profile/client/records']);

    }, 4000);




  }



}
