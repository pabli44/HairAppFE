import { NgModule } from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import components
import { ContactComponent } from './components/contact/contact.component'; 
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
