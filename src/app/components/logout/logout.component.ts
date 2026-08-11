import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'logout',
  template: ''
})
export class LogoutComponent {
  constructor(private router: Router) {
    localStorage.removeItem("UserSession");
    this.router.navigate(['/home']);
  }
}
