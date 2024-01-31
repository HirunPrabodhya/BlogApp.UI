import { AbstractControl, FormControl } from "@angular/forms";

export class CustomeValidation{
    
    static PasswordMacher(control:AbstractControl):|{[key:string]:boolean} | null{
            let password : AbstractControl | null = control.get('password');
            let confirm: AbstractControl | null = control.get('confirmPassword');

            if(password?.pristine || confirm?.pristine || !confirm?.value){
                return null;
            }
            if(password?.value === confirm?.value){
                return null;
            }
            return {match:true}
    }
}