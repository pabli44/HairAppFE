import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("UserSession")) {
      this.router.navigate(['/login']);
    }
  }
}
