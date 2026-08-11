import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
    standalone: true,
    imports: [RouterModule, TranslatePipe],
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.less']
})

export class AboutComponent {}
