import { NgModule } from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import components
import { ContactComponent } from './components/contact/contact.component'; 
import { SignComponent } from './components/sign/sign.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'sign', component: SignComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
