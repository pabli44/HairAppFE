import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})

export class LoginComponent{
    title = 'Login Page';
    email:string;
    password:string;
    profile:number;
    userArray:any;
    isData:boolean= false;
    showName:string;
    userIdToSession: string;

    loginForm = new FormGroup({
        email: new FormControl('',Validators.email),
        password: new FormControl(''),
        profile: new FormControl()
    });

    constructor(private userService:UserService, private toastr: ToastrService, private router:Router){

    }

    ngOnInit(){
        if(localStorage.getItem("UserSession")){
            localStorage.clear();
        }
    }

    onSubmit = () =>{
        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;
        this.profile = this.loginForm.get('profile').value;

        //consulta de usuario por email
        this.userService.getUserByEmail(this.email).toPromise().then(res => {
            this.userArray = res;

            if(this.userArray.length>1){
                if(this.userArray[0].profile.profileId==this.profile && this.userArray[0].password===this.password){
                    this.toastr.success('Your login was successfully', 'login Messages: ');
                    this.showName = this.userArray[0].name;
                    this.userIdToSession = this.userArray[0].userId;
                    this.isData= true;
                }else if(this.userArray[1].profile.profileId==this.profile && this.userArray[1].password===this.password){
                    this.toastr.success('Your login was successfully', 'login Messages: ');
                    this.showName = this.userArray[1].name;
                    this.userIdToSession = this.userArray[1].userId;
                    this.isData= true;
                }else{
                    this.toastr.error('Please, confirm your data', 'login Messages: ');
                }
                //return;
            }else if(this.userArray[0].profile.profileId==this.profile && this.userArray[0].password===this.password){
                this.toastr.success('Your login was successfully', 'login Messages: ');
                this.showName = this.userArray[0].name;
                this.userIdToSession = this.userArray[0].userId;
                this.isData= true;
            }else{
                this.toastr.error('Please, confirm your data', 'login Messages: ');
            }

            if(this.isData){
                if(this.profile==1){
                    localStorage.setItem("UserSession", this.userIdToSession);
                    this.router.navigate(['/profile/client'], { queryParams: {name: this.showName} });
                }else{
                    localStorage.setItem("UserSession", this.userIdToSession);
                    this.router.navigate(['/profile/professional'], { queryParams: {name: this.showName} });
                }
            }

        });
    
    }
}