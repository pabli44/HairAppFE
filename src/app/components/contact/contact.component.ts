import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.less']
})

export class ContactComponent {
  title = 'Contact Page';
}