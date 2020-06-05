//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

//directives
import { AlfabeticoDirective } from './directives/alfabetico.directive';
import { AlfabeticoNumericoDirective } from './directives/alfabeticonumerico.directive';
import { EmailValidator } from "./directives/emailvalidator.directive";
import { NumerosDirective } from './directives/numeros.directive';

//services
//import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    AboutComponent,
    LoginComponent,
    AlfabeticoDirective,
    AlfabeticoNumericoDirective,
    EmailValidator,
    NumerosDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        closeButton: true
      }
    )    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
