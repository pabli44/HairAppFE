import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.less']
})

export class AboutComponent{
    title = "About Page";
}