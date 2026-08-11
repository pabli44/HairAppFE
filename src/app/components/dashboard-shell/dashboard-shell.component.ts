import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, TranslatePipe, LanguageSwitcherComponent],
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.less']
})
export class DashboardShellComponent implements OnInit, OnDestroy {
  name = '';
  nameInitial = '';
  sidebarOpen = false;
  isProfessional = false;
  roleLabel = 'SHELL.ROLE_CLIENT';

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isProfessional = this.router.url.startsWith('/profile/professional');
    this.roleLabel = this.isProfessional ? 'SHELL.ROLE_PROFESSIONAL' : 'SHELL.ROLE_CLIENT';

    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe(params => {
        this.name = params['name'] ?? '';
        this.nameInitial = this.name ? this.name.charAt(0).toUpperCase() : '';
      })
    );

    this.subscriptions.push(
      this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.isProfessional = e.url.startsWith('/profile/professional');
          this.roleLabel = this.isProfessional ? 'SHELL.ROLE_PROFESSIONAL' : 'SHELL.ROLE_CLIENT';
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  logout() {
    localStorage.removeItem('UserSession');
    localStorage.removeItem('UserProfile');
    this.router.navigate(['/home']);
  }
}
