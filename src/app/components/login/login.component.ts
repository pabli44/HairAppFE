import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';




@Component({
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule, TranslatePipe],
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
    showPassword = false;
    isSubmitting = false;

    /*loginForm = new FormGroup({
        email: new FormControl('',Validators.email),
        password: new FormControl(''),
        profile: new FormControl()
    });*/

    loginForm: FormGroup;

    constructor(private userService:UserService, private toastr: ToastrService, private router:Router, private formBuilder:FormBuilder, private translate: TranslateService) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            profile: ['', Validators.required]
        });

    }

    onSubmit = () =>{

      try{
        if (this.loginForm.invalid || this.isSubmitting) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;


        this.email = this.loginForm.get('email').value;
        this.password = this.loginForm.get('password').value;
        this.profile = this.loginForm.get('profile').value;

        //consulta de usuario por email
        this.userService.getUserByEmail(this.email).toPromise().then(res => {
            this.userArray = res;

            // Coincidencia por email ingresado (case-insensitive)
            const userMatches = this.userArray.filter(
                user => user.email.toLowerCase() === this.email.toLowerCase()
            );

            // Entre los que coinciden, el del perfil seleccionado
            const matchedUser = userMatches.find(
                user => user.profile.profileId == this.profile
            );

            if (matchedUser && matchedUser.password === this.password) {
                this.toastr.success(this.translate.instant('TOAST.LOGIN_SUCCESS'), this.translate.instant('LOGIN.TOAST_TITLE'));
                this.showName = matchedUser.name;
                this.userIdToSession = matchedUser.userId;
                this.isData = true;
            } else {
                this.toastr.error(this.translate.instant('TOAST.LOGIN_DATA_INVALID'), this.translate.instant('LOGIN.TOAST_TITLE'));
            }

            if (this.isData){
                localStorage.setItem("UserSession", this.userIdToSession);
                localStorage.setItem("UserProfile", String(this.profile));
                // Profile 1 = Profesional, Profile 2 = Cliente
                const route = this.profile == 2 ? '/profile/client' : '/profile/professional';
                this.router.navigate([route], { queryParams: {name: this.showName} });
            }

            this.isSubmitting = false;

        }).catch(() => {
            this.isSubmitting = false;
            this.toastr.error(this.translate.instant('TOAST.LOGIN_FAILED'), this.translate.instant('LOGIN.TOAST_TITLE'));
        });
      }catch(error){
        console.log("API fails");
        alert(error);
        this.isSubmitting = false;
      }
    }
}
