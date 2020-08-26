import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AdressService } from 'src/app/services/adress.service';
import { Adress } from 'src/app/models/adress';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent{
    title = "Register Page";
    user:User;
    userArray:any;
    profileId: string;

    registerForm = new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl('', Validators.maxLength(10)),
        email: new FormControl('', Validators.email),
        userName: new FormControl(''),
        password: new FormControl(''),
        profile: new FormControl(),
        adress: new FormControl('')
    });

    constructor(private userService:UserService, private toastr: ToastrService, private adressService: AdressService){

    }

    onSubmit() {
        this.userService.getUserByEmail(this.registerForm.get('email').value).toPromise().then(res =>{
            //profiles validation
            this.userArray = res;

            if(this.userArray.length>0){
                if(this.userArray.length==2){
                    this.toastr.info('This email already exists with the two Profiles!', 'Messages: ');
                    return;
                }else{
                    if(this.profileId==this.userArray[0].profile.profileId){
                        this.toastr.info(`This email already exists with the ${this.userArray[0].profile.profileName} Profile, you must save with the other Profile`, 'Messages: ');
                        return;
                    }
                }
            }else{
                //save method
                let user:User = {        
                    userId: "",
                    profile: {
                        profileId: this.profileId,
                        profileName: ""
                    },
                    name: this.registerForm.get('name').value,
                    lastName: this.registerForm.get('lastName').value,
                    userName: this.registerForm.get('userName').value,
                    password: this.registerForm.get('password').value,
                    email: this.registerForm.get('email').value,
                    phone: this.registerForm.get('phone').value
                }

                const adress: Adress = {
                    description: this.registerForm.get('adress').value,
                    principal: 'S',
                    city: 'Medellin'
                  }

                this.userService.saveUser(user).subscribe(data => {
                    adress.user = data["recordId"];
                    this.adressService.saveAdress(adress);
                });

                this.toastr.success("User Was saved successfully", 'Messages: ');
                //this.registerForm.reset();
            }

        });
      
    }


    changeProfile(e){
        this.profileId = e.target.value;
    }
   
}