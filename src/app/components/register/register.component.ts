import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent{
    title = "Register Page";
    user:User;
    profile:Profile;
    userArray:any;

    registerForm = new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl('', Validators.maxLength(10)),
        email: new FormControl('', Validators.email),
        userName: new FormControl(''),
        password: new FormControl(''),
        profile: new FormControl('')
    });

    constructor(private userService:UserService, private toastr: ToastrService){

    }

    onSubmit() {
        //save method
        let user:User = {        
            userId: "",
            profile: {
                profileId: this.registerForm.get('profile').value,
                profileName: ""
            },
            name: this.registerForm.get('name').value,
            lastName: this.registerForm.get('lastName').value,
            userName: this.registerForm.get('userName').value,
            password: this.registerForm.get('password').value,
            email: this.registerForm.get('email').value,
            phone: this.registerForm.get('phone').value
        }
        this.userService.getUserByEmail(user.email).toPromise().then(res =>{
            //profiles validation
            this.userArray = res;
            if(this.userArray.length==2){
                this.toastr.info('This email already exists with the two Profiles!', 'Messages: ');
                return;
            }else{
                if(user.profile.profileId==this.userArray[0].profile.profileId){
                    this.toastr.info(`This email already exists with the ${this.userArray[0].profile.profileName} Profile, you must save with the other Profile`, 'Messages: ');
                    return;
                }
            }

            this.userService.saveUser(user);
            this.toastr.success("User Was saved successfully", 'Messages: ');
            this.registerForm.reset();

        });
    }
   
}