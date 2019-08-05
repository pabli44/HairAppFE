import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent{
    title = "Register Page";

    registerForm = new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        profile: new FormControl('')
    });

    constructor(){
        // this.registerForm.get('name').setValue("Cambios");
        // console.log(this.registerForm.get('name').value);
        
        // console.log(this.registerForm.get('profileP'));
        // console.log(this.registerForm.get('profileC'));
    }

    onSubmit() {
        //save method
        console.log(this.registerForm.get('name').value);
    }

    profileSelected = e => {
        console.log(e.target.value);
    }
   
}