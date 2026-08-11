import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AdressService } from 'src/app/services/adress.service';
import { Adress } from 'src/app/models/adress';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule, TranslatePipe],
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent{
    title = "Register Page";
    user:User;
    userArray:any;
    profileId: string;
    showPassword = false;
    isSubmitting = false;

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        profile: new FormControl('', Validators.required),
        adress: new FormControl('', Validators.required)
    });

    constructor(private userService:UserService, private toastr: ToastrService, private adressService: AdressService, private translate: TranslateService){

    }

    onSubmit() {
        if (this.registerForm.invalid || this.isSubmitting) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.profileId = this.registerForm.get('profile').value;

        this.userService.getUserByEmail(this.registerForm.get('email').value).toPromise().then(res =>{
            //profiles validation
            this.userArray = res;

            if(this.userArray.length>0){
                if(this.userArray.length==2){
                    this.toastr.info(this.translate.instant('TOAST.EMAIL_EXISTS_BOTH'), this.translate.instant('REGISTER.TOAST_TITLE'));
                    this.isSubmitting = false;
                    return;
                }else{
                    if(this.profileId==this.userArray[0].profile.profileId){
                        this.translate.get('TOAST.EMAIL_EXISTS_PROFILE', { profileName: this.userArray[0].profile.profileName }).subscribe(text => {
                            this.toastr.info(text, this.translate.instant('REGISTER.TOAST_TITLE'));
                        });
                        this.isSubmitting = false;
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

                this.toastr.success(this.translate.instant('TOAST.USER_SAVED'), this.translate.instant('REGISTER.TOAST_TITLE'));
                //this.registerForm.reset();
            }

            this.isSubmitting = false;
        });
      
    }


    changeProfile(e){
        this.profileId = e.target.value;
    }
   
}
