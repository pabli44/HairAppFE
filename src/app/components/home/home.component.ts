import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [RouterModule, TranslatePipe],
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent {}
