import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent{
    title = 'Login Page';

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    onSubmit = () =>{

        let value = this.loginForm.value;
        this.loginForm.controls['email'].setValue('Hola');
        console.log(value.email);
        //alert("On Submit");
    }
}