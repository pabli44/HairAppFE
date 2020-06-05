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
    user2:User;
    profile:Profile;
    

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
        this.userService.getUserByUsername(user.userName).toPromise().then(res =>{
            if(null!=res[0]){
                this.toastr.info('User exists!', 'Messages: ');
            }else{
                this.toastr.info("User doesn't exist!", 'Messages: ');
                this,this.userService.saveUser(user);
                this.registerForm.reset();
            }
        });
    }

    profileSelected = e => {
        console.log(e.target.value);
    }
   
}