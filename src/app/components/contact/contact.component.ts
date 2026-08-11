import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [RouterModule, TranslatePipe],
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.less']
})

export class ContactComponent {}
