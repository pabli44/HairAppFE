import { Directive , ElementRef } from "@angular/core"

@Directive({
    selector : '[alfabeticoNumericoTag]'
})

export class AlfabeticoNumericoDirective {
    constructor(public el: ElementRef) {
        this.el.nativeElement.onkeypress = (evt) => {
           let key = evt.keyCode || evt.which;
           let tecla = String.fromCharCode(key).toString();
           let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890";
           let especiales = [8, 39, 46, 6];
           let tecla_especial = false;

           for(var i in especiales) {
                if(key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
            }

            if(letras.indexOf(tecla) == -1 && !tecla_especial){
                evt.preventDefault();
            }
        };
    }
}

