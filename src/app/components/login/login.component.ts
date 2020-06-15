import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent{
    title = 'Login Page';
    email:string;
    password:string;

    loginForm = new FormGroup({
        email: new FormControl('',Validators.email),
        password: new FormControl('')
    });

    constructor(private userService:UserService, private toastr: ToastrService){

    }

    onSubmit = () =>{
        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;

        //consulta de usuario por email
        this.userService.getUserByEmail(this.email).toPromise().then(res => {
            if(null!=res[0]){
                if(this.password!=res[0].password){
                    this.toastr.error('Please, confirm your email and password', 'login Messages: ');
                }else{
                    this.toastr.success('Your login was successfully', 'login Messages: ');
                }
            }else{
                this.toastr.error("This email doesn't exist, please register your user.", 'login Messages: ');
            }
        });
    
    }
}