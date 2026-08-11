import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { LanguageService } from './services/language.service';

@Component({
  standalone: true,
  imports: [RouterModule, TranslatePipe, LanguageSwitcherComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'hair-app-fe';
  hideLogOut = true;
  isDashboardRoute = false;

  constructor(private router: Router, private languageService: LanguageService) {}

  ngOnInit(){
    this.languageService.init();
    this.hideLogOut = !localStorage.getItem("UserSession");
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isDashboardRoute = e.url.startsWith('/profile');
        this.hideLogOut = !localStorage.getItem("UserSession");
      }
    });
  }

  logout(){
    localStorage.removeItem("UserSession");
    this.hideLogOut = true;
    this.router.navigate(['/home']);
  }
}
