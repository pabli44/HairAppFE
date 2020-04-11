import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent{
    title = "Register Page";
    user:User;
    profile:Profile;
    

    registerForm = new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        userName: new FormControl(''),
        password: new FormControl(''),
        profile: new FormControl('')
    });

    constructor(private userService:UserService){


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
        //this.userService.saveUser(user);      ok
        //this.userService.deleteUser(6);       ok
        //this.userService.updateUser(7, user); ok(fix the password in backend) 
        //this.userService.getUsers();          ok
    }

    profileSelected = e => {
        //console.log(e.target.value);
    }
   
}