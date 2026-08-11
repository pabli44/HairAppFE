import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.less']
})
export class ShowProfileComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    const profile = localStorage.getItem("UserProfile");
    if (profile === "1") {
      this.router.navigate(['/profile/professional']);
    } else {
      this.router.navigate(['/profile/client']);
    }
  }
}
