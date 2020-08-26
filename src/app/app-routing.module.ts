import { NgModule } from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import components
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component'; 
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { ClientComponent } from './components/show-profile/client/client.component';
import { RecordComponent } from './components/show-profile/client/record/record.component';
import { ServiceComponent } from './components/show-profile/client/service/service.component';
import { ProfessionalComponent } from './components/show-profile/professional/professional.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'profile', component: ShowProfileComponent},
  {path: 'profile/client', component: ClientComponent},
  {path: 'profile/client/record', component: RecordComponent},
  {path: 'profile/client/create-new-service', component: ServiceComponent},
  {path: 'profile/professional', component: ProfessionalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
