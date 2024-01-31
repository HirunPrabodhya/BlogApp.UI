import { AbstractControl } from "@angular/forms";

export class UrlCustomeValidation{
    static urlValidation(control: AbstractControl):{[key:string]:boolean} | null{
        let value: string = control.value;
        if(value && !value.includes('https')){
            return {urlError: true}
        }
        return null;
    }
}