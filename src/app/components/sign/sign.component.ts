import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'sign',
    templateUrl: './sign.component.html',
    styleUrls: ['./sign.component.less']
})

export class SignComponent{
    title = "Sign Page";

    signForm = new FormGroup({
        name: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        profileP: new FormControl(''),
        profileC: new FormControl('')
    });

    onSubmit() {
        // TODO: Use EventEmitter with form value
        console.log(this.signForm.get('name').value);
    }

    checkProfile = e => {
        console.log(e.target.checked);
    }

    constructor(){
        this.signForm.get('name').setValue("Cambios");
        console.log(this.signForm.get('name').value);
        
        console.log(this.signForm.get('profileP'));
        console.log(this.signForm.get('profileC'));
    }
}