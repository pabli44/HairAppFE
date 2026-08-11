import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'hair-app-fe';
  hideLogOut = true;

  constructor(private router: Router) {}

  ngOnInit(){
    this.hideLogOut = !localStorage.getItem("UserSession");
  }

  logout(){
    localStorage.removeItem("UserSession");
    this.hideLogOut = true;
    this.router.navigate(['/home']);
  }
}
